import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    nom?: string;

    @IsOptional()
    @IsString()
    prenom?: string;

    @IsOptional()
    @IsString()
    sexe?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    passwd?: string; // Notez que vous pouvez omettre ce champ si vous ne voulez pas mettre à jour le mot de passe.

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    telephone?: string;

    @IsOptional()
    @IsString()
    specialite?: string;

    @IsOptional()
    @IsString()
    adresse?: string;

    @IsOptional()   // Champ optionnel pour la date (format string ISO) 
    date?: string;

    @IsOptional()   // Champ optionnel pour l'heure (format string)
    heure?: string;

    @IsOptional()   // Champ optionnel pour l'urgence
    urgence?: string;

    @IsOptional()   // Champ optionnel pour le statut
    statut?: string;
}

