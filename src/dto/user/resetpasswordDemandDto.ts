import { IsEmail } from "class-validator";

export class ResetpasswordDemandDto {
    @IsEmail()  // Nom d'utilisateur requis
    readonly email: string;   


}