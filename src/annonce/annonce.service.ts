import { Injectable } from '@nestjs/common';
import { CreateAnnonceDto } from 'dto/annonce/CreateAnnonceDto';
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class AnnonceService {
  constructor(private prisma: PrismaService) {}

  async createAnnonce(createAnnonceDto: CreateAnnonceDto, creatorId: number) {
    const annonce = await this.prisma.annonce.create({
      data: {
        ...createAnnonceDto,
        created_by: creatorId,
      },
      include: {
        creator: true,
        assigned_admin: true,
      },
    });
    return annonce;
  }
}
