// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

// Configuration des options de Multer
export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Répertoire pour stocker les fichiers
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      callback(null, `${uniqueSuffix}${extension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Type de fichier non autorisé'), false);
    }
  },
};
