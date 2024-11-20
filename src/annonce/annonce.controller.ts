// src/annonce/annonce.controller.ts
import { Controller, Post, Body, Request, UseGuards, Req, Param, Patch, Get, UseInterceptors, UploadedFiles, UploadedFile, Res, Query } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from './interface/authenticated-request.interface';
import { RolesGuard } from 'guard/roles.guard';
import { Roles } from 'decorator/roles.decorator';
import { JwtAuthGuard } from 'guard/jwt-auth.guard';
import { CreateAnnonceDto } from 'dto/annonce/CreateAnnonceDto';
import { PushNotificationService } from 'notifications/pushNotification.service';
import { MailService } from 'mail/mail.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'auth/config/multer.config';
import {diskStorage} from "multer";
import {Response} from "express";
import  * as path from "path";
import * as fs from 'fs';


interface FileParams {
    fileName : string;
  }


@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('annonces')
export class AnnonceController {
  constructor(
    private readonly annonceService: AnnonceService,
    private readonly mailService: MailService,
    private readonly pushNotificationService: PushNotificationService
  ) { }

 
 
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'photos', maxCount: 10 },
    ],
    {
      storage: diskStorage({
        destination: path.join(__dirname, '..', 'src', 'uploads'),  // Stockage des photos dans src/uploads
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);  // Pour éviter les conflits de noms
        }
      }),
    }
  ))
  async createAnnonce(
    @Body() createAnnonceDto: CreateAnnonceDto,
    @Req() req: any,
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
  ) {
    // Traite les fichiers et les données
    if (files.photos) {
      createAnnonceDto.photos = files.photos.map(file => `/uploads/${file.filename}`);  // Stocker le chemin relatif des fichiers
    }

    // Appeler le service pour créer l'annonce
    const annonce = await this.annonceService.createAnnonce(createAnnonceDto, req.user.id);

    return { message: 'Annonce créée avec succès', photos: createAnnonceDto.photos };
  }  @Patch('approve/:id')
  async approveAnnouncement(@Param('id') id: string) {
    // Convertir 'id' en number
    const annonceId = parseInt(id, 10);
    if (isNaN(annonceId)) {
      throw new Error('ID de l\'annonce invalide');
    }
    return await this.annonceService.approveAnnouncement(annonceId);
  }

  @Patch('reject/:id')
  async rejectAnnouncement(@Param('id') id: string) {
    // Convertir 'id' en number
    const annonceId = parseInt(id, 10);
    if (isNaN(annonceId)) {
      throw new Error('ID de l\'annonce invalide');
    }
    return await this.annonceService.rejectAnnouncement(annonceId);
  }


  @Post('upload') // La route pour l'upload
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '..', 'src', 'uploads'), // Le chemin vers le dossier 'uploads'
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`); // Nom du fichier dans le répertoire de destination
      }
    })
  }))
  async uploadFile(@UploadedFile() file: any) {
    console.log('Uploaded file:', file);
    // Retourne le nom du fichier
    return { message: 'File uploaded successfully', file: file.originalname };
  }

  // Méthode pour récupérer toutes les images
  @Get('getAllFiles')
  async getAllFiles(@Res() res: Response) {
    const directoryPath = path.join(__dirname, '..', 'src', 'uploads'); // Le chemin du dossier contenant les images

    try {
      // Récupère la liste des fichiers dans le répertoire
      const files = fs.readdirSync(directoryPath);
      console.log('Fichiers trouvés dans le répertoire:', files);

      // Formate les URLs des fichiers
      const fileUrls = files.map((fileName) => ({
        fileName,
        url: `http://localhost:3000/annonces/getFile?fileName=${fileName}`, // URL pour accéder à l'image
      }));

      // Envoie la liste des URLs sous forme de réponse JSON
      res.status(200).json({ files: fileUrls });
    } catch (err) {
      console.error('Erreur lors de la lecture des fichiers:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des fichiers' });
    }
  }


  // To Serve File
  @Get('getFile')
  getFile(@Res() res: Response, @Query('fileName') fileName: string) {
      const filePath = path.join(__dirname, '..', 'src', 'uploads', fileName); // Chemin absolu vers le fichier

      console.log('Fetching file from:', filePath);

      // Vérifie si le fichier existe avant de l'envoyer
      if (fs.existsSync(filePath)) {
          res.sendFile(filePath, (err) => {
              if (err) {
                  console.error('Error sending file:', err);
                  res.status(404).send({ message: 'File not found' });
              }
          });
      } else {
          res.status(404).send({ message: 'File not found' });
      }
  }

}
