import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateAnnonceDto {
  @IsNotEmpty() titre: string;
  @IsNotEmpty() description: string;
  @IsNotEmpty() typePropriete: string;
  @IsNotEmpty() montant: number;
  @IsNotEmpty() superficie: number;
  @IsNotEmpty() nbChambres: number;
  @IsNotEmpty() nbSalleDeDouche: number;
  @IsBoolean() veranda: boolean;
  @IsBoolean() terrasse: boolean;
  @IsBoolean() cuisine: boolean;
  @IsBoolean() dependance: boolean;
  @IsBoolean() piscine: boolean;
  @IsBoolean() garage: boolean;
  @IsNotEmpty() localite: string;
  @IsBoolean() titreFoncier: boolean;
  @IsNotEmpty() localisation: string;
  @IsOptional() details?: string;
  @IsNotEmpty() typeTransaction: string;
  @IsOptional() visite360?: string;
  @IsOptional() photos?: string[];  // Le tableau d'URLs des photos
  @IsOptional() video?: string;
  @IsOptional() @IsNumber() assigned_admin_id?: number;
}
