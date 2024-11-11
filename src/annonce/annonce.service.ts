import { Injectable } from '@nestjs/common';
import { CreateAnnonceDto } from 'src/dto/annonce/CreateAnnonceDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnonceService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createAnnonceDto: CreateAnnonceDto, userId: number) {
        if (!userId) {
          throw new Error('L\'ID de l\'utilisateur est requis');
        }
    
        const annonce = await this.prismaService.annonce.create({
          data: {
            titre: createAnnonceDto.titre,
            description: createAnnonceDto.description,
            typePropriete: createAnnonceDto.typePropriete,
            montant: createAnnonceDto.montant,
            superficie: createAnnonceDto.superficie,
            nbChambres: createAnnonceDto.nbChambres,
            nbSalleDeDouche: createAnnonceDto.nbSalleDeDouche,
            veranda: createAnnonceDto.veranda,
            terrasse: createAnnonceDto.terrasse,
            cuisine: createAnnonceDto.cuisine,
            dependance: createAnnonceDto.dependance,
            piscine: createAnnonceDto.piscine,
            garage: createAnnonceDto.garage,
            localite: createAnnonceDto.localite,
            titreFoncier: createAnnonceDto.titreFoncier,
            localisation: createAnnonceDto.localisation,
            details: createAnnonceDto.details,
            typeTransaction: createAnnonceDto.typeTransaction,
            visite360: createAnnonceDto.visite360,
            video: createAnnonceDto.video,
            created_by: userId,  // Relier l'utilisateur créateur
          },
        });
    
        return annonce;
      }

}
