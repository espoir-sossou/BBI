import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config"
import { AnnonceModule } from './annonce/annonce.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, PrismaModule, UserModule, AnnonceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
