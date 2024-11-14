// auth/authenticated-request.interface.ts
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    sub: number; // ID de l'utilisateur connecté
    // Ajoutez d'autres propriétés nécessaires de l'utilisateur
  };
}
