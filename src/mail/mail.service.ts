import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from 'dto/user/signupDto';


@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) { }
    private async transporter() {
        const testAccount = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            ignoreTLS: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });
        return transport;
    }

    async sendSAdminCreateAccount(userEmail: string, userPassword: string) {
        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <div style="text-align: center; padding: 20px 0; background-color: #f4f4f4;">
                    <h2 style="font-weight: bold; font-size: 24px; color: #333;">Confirmation de création de compte</h2>
                    <p style="font-size: 18px; color: #555;">Bienvenue dans notre clinique !</p>
                </div>
                <div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px;">
                    <p style="font-size: 16px; color: #333;">
                        Bonjour,
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Votre compte a été créé avec succès. Voici vos informations de connexion :
                    </p>
                    <ul style="font-size: 16px; color: #333; list-style: none; padding: 0;">
                        <li><strong>Email :</strong> ${userEmail}</li>
                        <li><strong>Mot de passe :</strong> ${userPassword}</li>
                    </ul>
                    <p style="font-size: 16px; color: #e74c3c;">
                        <strong>Important :</strong> Ne partagez ces informations avec personne. Gardez-les en sécurité.
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Vous pouvez vous connecter en cliquant sur le bouton ci-dessous :
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="https://votre-clinique.com/login" style="padding: 12px 24px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Se connecter à mon compte
                        </a>
                    </div>
                </div>
                <div style="text-align: center; padding: 10px 0; background-color: #f4f4f4; font-size: 14px; color: #777;">
                    Si vous n'êtes pas à l'origine de cette inscription, veuillez nous contacter immédiatement.
                </div>
            </div>
        `;

        (await this.transporter()).sendMail({
            from: this.configService.get<string>('EMAIL_USER'),
            to: userEmail,
            subject: "Votre compte à la clinique a été créé avec succès",
            html: emailBody,
        });
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        const clinicImageUrl = 'http://localhost:3000/images/clinique-logo.png'; // URL pointant vers l'image locale

        (await this.transporter()).sendMail({
            from: this.configService.get<string>('EMAIL_USER'),
            to: userEmail,
            subject: "Réinitialisation du mot de passe",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <!-- Image de la clinique -->
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${clinicImageUrl}" alt="Clinique" style="max-width: 100%; height: auto; border-radius: 10px;">
            </div>
            
            <!-- Contenu principal -->
            <div style="text-align: center; padding: 10px 20px;">
                <h1 style="font-weight: bold; font-size: 24px; color: #333;">Réinitialisation du mot de passe</h1>
                <p style="font-size: 16px; color: #555;">
                    Bonjour,
                    <br><br>
                    Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :
                </p>
                <a href="${url}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 18px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                    Réinitialiser mon mot de passe
                </a>
                <p style="font-size: 16px; color: #555;">
                    Si le bouton ci-dessus ne fonctionne pas, vous pouvez aussi utiliser le code de réinitialisation suivant :
                </p>
                <p style="font-weight: bold; font-size: 20px; color: #000;">${code}</p>
                <p style="font-size: 14px; color: #777;">
                    Ce code est valide pendant 15 minutes.
                </p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 10px 20px; font-size: 12px; color: #aaa; margin-top: 20px;">
                Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email ou contacter notre service d'assistance.
            </div>
        </div>`
        });
    }

    async sendSignupConfirmation(userEmail: string, prenom: string, password: string) {
        await (await this.transporter()).sendMail({
            from: this.configService.get<string>('EMAIL_USER'),
            to: userEmail,
            subject: "Bienvenue sur Bolivie Business Inter - Confirmation d'inscription",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; padding: 20px; border-radius: 8px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center;">
                        <h2 style="font-size: 24px; font-weight: bold; color: #4CAF50;">Bienvenue, ${prenom} !</h2>
                        <p style="font-size: 16px; line-height: 1.5; color: #333;">
                            Votre compte a été créé avec succès sur <strong>Bolivie Business Inter</strong>. Vous pouvez maintenant accéder à votre tableau de bord pour gérer vos projets et activités dans le secteur du BTP.
                        </p>
                        
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <h3 style="font-size: 18px; color: #333;">Détails de votre compte :</h3>
                            <p style="font-size: 16px; line-height: 1.5; color: #333;">
                                <strong>Email :</strong> ${userEmail}<br>
                                <strong>Mot de passe :</strong> ${password}<br>
                            </p>
                        </div>
    
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="http://localhost:8000/login-page" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Se connecter</a>
                        </div>
    
                        <p style="font-size: 16px; line-height: 1.5; color: #333;">
                            <strong>Important :</strong> Ne partagez jamais vos identifiants avec qui que ce soit. 
                            Nous ne demanderons jamais vos informations personnelles par email.
                        </p>
    
                        <p style="font-size: 16px; line-height: 1.5; color: #333;">
                            Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter à <a href="mailto:support@boliviebusinessinter.com" style="color: #4CAF50;">support@boliviebusinessinter.com</a>.
                        </p>
                    </div>
                </div>
            `
        });
    }

    async getStaffEmails(): Promise<string[]> {
        try {
            const staffUsers = await this.prismaService.user.findMany({
                where: {
                    role: {
                        in: ['ADMIN', 'MEDECIN', 'INFIRMIER', 'INFIRMIER_AUXILIAIRE', 'AIDE_SOIGNANT']
                    }
                },
                select: {
                    email: true,
                },
            });

            console.log('Récupération des e-mails du personnel:', staffUsers);

            // Vérifie si des utilisateurs ont été trouvés
            if (staffUsers.length === 0) {
                console.warn('Aucun personnel trouvé avec ces rôles.');
                return [];
            }

            const staffEmails = staffUsers.map(user => user.email);
            console.log('E-mails du personnel récupérés:', staffEmails);

            return staffEmails;

        } catch (error) {
            console.error('Erreur lors de la récupération des e-mails du personnel:', error);
            throw new Error('Impossible de récupérer les e-mails du personnel.');
        }
    }

    async sendPatientNotification(userEmail: string, patientInfo: SignupDto) {
        const { username, date, heure } = patientInfo;

        try {
            console.log('Début de l\'envoi d\'e-mail de confirmation au patient:', userEmail);

            // Envoi de l'e-mail au patient
            const transporter = await this.transporter();
            await transporter.sendMail({
                from: this.configService.get<string>('EMAIL_USER'),
                to: userEmail,
                subject: "Bienvenue à la Clinique - Confirmation d'inscription",
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="font-size: 24px; font-weight: bold; text-align: center;">Bienvenue, ${username} !</h2>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Votre compte a été créé avec succès. Vous pouvez maintenant accéder à nos services.
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://votre-clinique.com/login" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Se connecter</a>
                        </div>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Si vous avez des questions, n'hésitez pas à nous contacter.
                        </p>
                    </div>
                `
            });

            console.log('E-mail envoyé au patient:', userEmail);

            // Récupération des e-mails du personnel
            console.log('Récupération des e-mails du personnel...');
            const staffEmails = await this.getStaffEmails();

            // Vérifie que staffEmails n'est pas vide
            if (staffEmails.length === 0) {
                console.warn("Aucun e-mail de personnel trouvé. Aucun e-mail ne sera envoyé au personnel.");
                return;
            }

            // Envoi de l'e-mail au personnel
            console.log('Envoi d\'e-mail au personnel:', staffEmails);
            await transporter.sendMail({
                from: this.configService.get<string>('EMAIL_USER'),
                to: staffEmails,
                subject: "Nouveau patient enregistré à la clinique",
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="font-size: 24px; font-weight: bold;">Nouveau patient enregistré</h2>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Un nouveau patient vient d'arriver à la clinique :
                        </p>
                        <ul>
                            <li><strong>Nom :</strong> ${username}</li>
                            <li><strong>Date d'arrivée :</strong> ${date}</li>
                            <li><strong>Heure :</strong> ${heure}</li>
                            
                        </ul>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Merci de vous préparer à l'accueillir.
                        </p>
                    </div>
                `
            });

            console.log('E-mail envoyé au personnel:', staffEmails);

        } catch (error) {

            throw new Error("Échec de l'envoi des notifications par e-mail.");
        }
    }

    async sendEmailToAdmin(subject: string, content: string) {
        // Récupérer les emails des administrateurs
        const adminEmails = await this.prismaService.user.findMany({
            where: { role: 'ADMIN' },
            select: { email: true },
        }).then(admins => admins.map(admin => admin.email));

        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>${subject}</h2>
                <p>${content}</p>
            </div>
        `;

        await (await this.transporter()).sendMail({
            from: this.configService.get<string>('EMAIL_USER'),
            to: adminEmails,
            subject: subject,
            html: emailBody,
        });
    }

}
