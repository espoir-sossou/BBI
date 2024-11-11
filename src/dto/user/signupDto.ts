import { IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class SignupDto {
    @IsOptional()    // Nom de l'utilisateur
    readonly nom?: string;

    @IsOptional()    // Prénom de l'utilisateur
    readonly prenom?: string;

    @IsOptional()    // Sexe de l'utilisateur
    readonly sexe?: string;

    @IsOptional()    // Nom d'utilisateur
    readonly username?: string;

    @IsEmail()  // Email requis
    readonly email: string;

    @IsNotEmpty()    // Mot de passe requis
    readonly password: string;

    @IsNotEmpty()    // Rôle requis
    readonly role: string;

    @IsOptional()   // Champ optionnel pour le numéro de téléphone
    readonly telephone?: string;

    @IsOptional()   // Champ optionnel pour l'adresse (Patient)
    readonly adresse?: string;

    @IsOptional()   // Champ optionnel pour la date (format string ISO)
    @IsDateString() // Utiliser une chaîne de date valide
    readonly date?: string;

    @IsOptional()   // Champ optionnel pour l'heure (format string)
    readonly heure?: string;

}
