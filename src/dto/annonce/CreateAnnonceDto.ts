import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PhotoDto {
    @IsNotEmpty()
    @IsString()
    url: string;
}

export class CreateAnnonceDto {
    @IsOptional()
    @IsString()
    titre: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    typePropriete: string;

    @IsOptional()
    @IsNumber()
    montant: number;

    @IsOptional()
    @IsNumber()
    superficie: number;

    @IsOptional()
    @IsNumber()
    nbChambres: number;

    @IsOptional()
    @IsNumber()
    nbSalleDeDouche: number;

    @IsOptional()
    @IsString()
    veranda: string;

    @IsOptional()
    @IsString()
    terrasse: string;

    @IsOptional()
    @IsString()
    cuisine: string;

    @IsOptional()
    @IsString()
    dependance: string;

    @IsOptional()
    @IsString()
    piscine: string;

    @IsOptional()
    @IsString()
    garage: string;

    @IsOptional()
    @IsString()
    localite: string;

    @IsOptional()
    @IsString()
    titreFoncier: string;

    @IsOptional()
    @IsString()
    localisation: string;

    @IsOptional()
    @IsString()
    details: string;

    @IsOptional()
    @IsString()
    typeTransaction: string;

    @IsOptional()
    @IsString()
    visite360: string;

    @IsOptional()
    @IsString()
    video: string;

    @IsOptional()
    @IsBoolean()
    validee: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PhotoDto)
    photos: PhotoDto[];

    @IsOptional()
    @IsNumber()
    assigned_user_id: number;
}
