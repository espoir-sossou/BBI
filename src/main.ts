import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '../uploads'), {
    prefix: '/uploads', // Définit l'URL d'accès
  });

  const port = process.env.PORT || 3000; // Définit un port par défaut
  await app.listen(port);

}
bootstrap();
