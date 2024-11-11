import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninDto {
    @IsEmail()  // Nom d'utilisateur requis
    readonly email: string;   
    @IsNotEmpty()
    readonly password: string; 
}