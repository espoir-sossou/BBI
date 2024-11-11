import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {ConfigModule} from "@nestjs/config"


@Global()
@Module({
  imports: [ConfigModule],  // Assurez-vous que ConfigModule est bien importé ici
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
