import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AnnonceModule } from './annonce/annonce.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    AnnonceModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Chemin vers le dossier 'uploads'
      serveRoot: '/uploads', // URL d'accès pour les fichiers
      serveStaticOptions: {
        index: false, // Désactive la recherche de 'index.html'
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
