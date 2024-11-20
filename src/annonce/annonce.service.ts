// src/annonce/annonce.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAnnonceDto } from 'dto/annonce/CreateAnnonceDto';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'mail/mail.service';
import { PushNotificationService } from 'notifications/pushNotification.service';

@Injectable()
export class AnnonceService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private pushNotificationService: PushNotificationService,
    private readonly prismaService: PrismaService) { }
    
    async createAnnonce(createAnnonceDto: CreateAnnonceDto, creatorId: number) {
      // Vérifiez si l'admin assigné existe
      const admin = createAnnonceDto.assigned_admin_id
        ? await this.prismaService.user.findUnique({
            where: { user_id: createAnnonceDto.assigned_admin_id },
          })
        : null;
  
      if (createAnnonceDto.assigned_admin_id && !admin) {
        throw new BadRequestException("L'administrateur assigné n'existe pas.");
      }
  
      // Créer l'annonce avec `validee: false` et `created_by` correctement assigné
      const annonce = await this.prismaService.annonce.create({
        data: {
          titre: createAnnonceDto.titre,
          description: createAnnonceDto.description,
          typePropriete: createAnnonceDto.typePropriete,
          montant: createAnnonceDto.montant,
          superficie: createAnnonceDto.superficie,
          nbChambres: createAnnonceDto.nbChambres,
          nbSalleDeDouche: createAnnonceDto.nbSalleDeDouche,
          veranda: createAnnonceDto.veranda,
          terrasse: createAnnonceDto.terrasse,
          cuisine: createAnnonceDto.cuisine,
          dependance: createAnnonceDto.dependance,
          piscine: createAnnonceDto.piscine,
          garage: createAnnonceDto.garage,
          localite: createAnnonceDto.localite,
          titreFoncier: createAnnonceDto.titreFoncier,
          localisation: createAnnonceDto.localisation,
          details: createAnnonceDto.details,
          typeTransaction: createAnnonceDto.typeTransaction,
          visite360: createAnnonceDto.visite360,
          video: createAnnonceDto.video,
          validee: false, // L'annonce est créée avec un statut "en attente"
          assigned_admin_id: createAnnonceDto.assigned_admin_id,  // Vérifiez que ce champ est optionnel et que l'ID est valide
          photos: {
            create: createAnnonceDto.photos?.map(url => ({
              url,  // Si vous avez un tableau d'URLs, vous l'ajoutez ici
            })),
          },
        },
        include: {
          assigned_admin: true,
          photos: true,  // Inclure les photos dans la réponse
        },
      });
  
      // Envoyer un email à l'admin assigné (si un admin est assigné)
      if (admin) {
        const emailSubject = 'Nouvelle annonce en attente d\'approbation';
        const emailContent = `
          Une nouvelle annonce intitulée "${annonce.titre}" a été créée et nécessite votre approbation. 
        `;
        await this.mailService.sendEmailToAdmin(emailSubject, emailContent, admin.email, annonce.annonce_id.toString());
  
        // Envoyer une notification push à l'admin assigné
        const pushMessage = `Nouvelle annonce en attente : ${annonce.titre}`;
        await this.pushNotificationService.sendPushNotificationToAdmin(pushMessage, admin.user_id);
      }
  
      return annonce;
    }
    
  




  // Méthode pour approuver une annonce
  async approveAnnouncement(id: number) {
    try {
      const updatedAnnonce = await this.prismaService.annonce.update({
        where: { annonce_id: id },
        data: { validee: true }, // Marquer l'annonce comme validée
      });

      return {
        message: 'Annonce approuvée avec succès!',
        annonce: updatedAnnonce,
      };
    } catch (error) {
      return { message: 'Erreur lors de l\'approbation de l\'annonce.' };
    }
  }

  // Méthode pour rejeter une annonce
  async rejectAnnouncement(id: number) {
    try {
      const updatedAnnonce = await this.prismaService.annonce.update({
        where: { annonce_id: id },
        data: { validee: false }, // Marquer l'annonce comme rejetée
      });

      return {
        message: 'Annonce rejetée avec succès!',
        annonce: updatedAnnonce,
      };
    } catch (error) {
      return { message: 'Erreur lors du rejet de l\'annonce.' };
    }
  }
}
