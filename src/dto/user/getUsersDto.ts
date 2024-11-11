import { IsOptional } from 'class-validator';

export class GetUsersDto {
    @IsOptional() // Rôle optionnel
    readonly role?: string;
}
