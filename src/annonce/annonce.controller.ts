// src/annonce/annonce.controller.ts

import { Controller, Post, Body,Request, UseGuards } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { MailService } from 'src/mail/mail.service';
import { PushNotificationService } from 'src/notifications/pushNotification.service';
import { CreateAnnonceDto } from 'src/dto/annonce/CreateAnnonceDto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';



@UseGuards(AuthGuard('jwt'), RolesGuard)

@Controller('annonces')
export class AnnonceController {
    constructor(
        private readonly annonceService: AnnonceService,
        private readonly mailService: MailService,
        private readonly pushNotificationService: PushNotificationService
    ) {}

    @Roles('ADMIN', 'AGENCE', 'VENDEUR')
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createAnnonce(@Body() createAnnonceDto: CreateAnnonceDto, @Request() req) {
        const userId = req.user?.userId; // Récupération de l'ID de l'utilisateur

        console.log("ID de l'utilisateur :", userId); // Pour voir si userId est bien récupéré

        if (!userId) {
            throw new Error("L'ID de l'utilisateur est requis");
        }

        const annonce = await this.annonceService.create(createAnnonceDto, userId);

        const subject = `Nouvelle Annonce: ${annonce.titre}`;
        const content = `Une nouvelle annonce a été créée avec le titre: ${annonce.titre} et la description: ${annonce.description || ''}`;

        // Envoyer une notification par e-mail aux administrateurs
        await this.mailService.sendEmailToAdmin(subject, content);

        // Envoyer une notification push aux administrateurs
        await this.pushNotificationService.sendPushNotificationToAdmin(subject);

        return annonce;
    }
    
}    
