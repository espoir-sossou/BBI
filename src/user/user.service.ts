import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/user/signupDto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'mail/mail.service';
import { createResponse, STATUS_CODES } from '../../constant/status.constants';




@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService, private readonly mailerService: MailService,
    ) { }
    async creates(signUpDto: SignupDto) {
        const { nom, prenom, sexe, adresse, telephone, email, password, role, date, heure } = signUpDto;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await this.prismaService.user.findUnique({ where: { email } });
        if (existingUser) {
            return createResponse(STATUS_CODES.USER_NOT_FOUND.code); // Renvoie un code d'erreur si l'utilisateur existe
        }

        // Hachage du mot de passe
        const hash = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await this.prismaService.user.create({
            data: {
                nom,
                prenom,
                email,
                password: hash,
                role,
                telephone,
            },
        });

        // Envoyer l'email de confirmation avec les identifiants
        await this.mailerService.sendSAdminCreateAccount(email, password); // Envoi du mot de passe en clair ici

        // Retourner les informations de l'utilisateur créé
        return createResponse(STATUS_CODES.SUCCESS.code, {
            user: {
                user_id: newUser.user_id,
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                role: newUser.role,
                telephone: newUser.telephone,
            }
        });
    }

    async getUserById(user_id: number) {
        const user = await this.prismaService.user.findUnique({
            where: { user_id: user_id },
            select: {
                user_id: true,
                email: true,
                role: true,
                telephone: true,
            }
        });

        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        return user; // Retourner l'utilisateur trouvé sans le formatage
    }
    async getUserByEmail(email: string) {
        return this.prismaService.user.findUnique({
          where: { email },
        });
      }
      async create(signUpDto: SignupDto) {
        const { nom, prenom, sexe, adresse, telephone, email, password, role, date, heure } = signUpDto;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await this.prismaService.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new ConflictException('L’utilisateur existe déjà');
        }

        // Hachage du mot de passe
        const hash = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await this.prismaService.user.create({
            data: {
                nom,
                prenom,
                email,
                password: hash,
                role,
                telephone,
                // Ajouter d'autres champs selon votre modèle Prisma
            },
        });

        // Envoyer l'email de confirmation avec les identifiants
        await this.mailerService.sendSAdminCreateAccount(email, password);

        return newUser; // Retourne directement l'utilisateur créé
    }      

    }
