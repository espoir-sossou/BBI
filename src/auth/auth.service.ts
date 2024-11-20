import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from '../dto/user/signupDto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '../dto/user/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetpasswordDemandDto } from '../dto/user/resetpasswordDemandDto';
import * as speakeasy from 'speakeasy';
import { DeleteAccountDto } from '../dto/user/deleteAccountDto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'mail/mail.service';
import { UserService } from 'user/user.service';
import { createResponse, STATUS_CODES } from '../../constant/status.constants';


@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,
        private readonly mailerService: MailService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,  // Assuming ConfigService is defined elsewhere
        private readonly userService: UserService, // Injectez ici
    ) { }
    async signup(signUpDto: SignupDto) {
        const { nom, prenom, sexe, telephone, email, password, role, username, adresse } = signUpDto;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await this.prismaService.user.findUnique({ where: { email } });
        if (userExists) {
            throw new ConflictException("L'utilisateur existe déjà");
        }

        // Sauvegarder le mot de passe en clair temporairement
        const plainPassword = password;

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await this.prismaService.user.create({
            data: {
                nom,
                prenom,
                sexe,
                role,
                email,
                password: hashedPassword,
                telephone,
                adresse,
            }
        });

        // Envoi de l'e-mail de confirmation avec le mot de passe en clair
        await this.mailerService.sendSignupConfirmation(email, prenom, plainPassword);

        return { data: 'Utilisateur inscrit avec succès. Un e-mail de confirmation a été envoyé.' };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        console.log('Tentative de connexion pour email: ', email); // Log de débogage

        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) {
            console.log('Utilisateur non trouvé pour cet email');
            return createResponse(STATUS_CODES.USER_NOT_FOUND.code);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log('Mot de passe incorrect pour cet utilisateur');
            return createResponse(STATUS_CODES.INVALID_PASSWORD.code);
        }

        const payload = {
            sub: user.user_id,
            email: user.email,
        };
        const token = this.jwtService.sign(payload, {
            expiresIn: '2h',
            secret: this.configService.get('SECRET_KEY'),
        });

        return {
            status: STATUS_CODES.SUCCESS.code,
            message: STATUS_CODES.SUCCESS.message,
            data: {
                id: user.user_id,
                nom: user.nom,
                prenom: user.prenom,
                numero_telephone: user.telephone,
                role: user.role,
                email: user.email,
                token: token,
                duree_validite_token: 60,
            },
        };
    }


    async findOrCreateUserFromGoogle(profile: any) {
        const email = profile.emails[0].value;
        const phoneNumber = profile.phone || null;  // Utilise null par défaut si pas de téléphone

        let user = await this.userService.getUserByEmail(email);

        if (!user) {
            const password = this.generateTemporaryPassword();

            const newUserResponse = await this.userService.create({
                nom: profile.name.familyName,
                prenom: profile.name.givenName,
                email,
                password,
                role: 'USER',
                telephone: phoneNumber,
            });

            user = newUserResponse;
        }

        console.log('User returned from findOrCreateUserFromGoogle:', user);  // Loggez l'utilisateur

        Reflect.deleteProperty(user, 'password');
        return user;
    }

    generateTemporaryPassword() {
        // Vous pouvez utiliser une bibliothèque comme 'crypto' ou 'uuid' pour générer un mot de passe aléatoire
        return Math.random().toString(36).slice(-8); // Exemple simple générant un mot de passe aléatoire de 8 caractères
    }




}
