import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  // Fonction pour gérer l'upload du fichier
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadPath = path.join(__dirname, '../../uploads'); // Le dossier de stockage des fichiers
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    
    // Déplacer le fichier dans le dossier de destination
    const filePath = path.join(uploadPath, file.originalname);
    fs.renameSync(file.path, filePath);

    return filePath; // Retourne le chemin du fichier stocké
  }
}
