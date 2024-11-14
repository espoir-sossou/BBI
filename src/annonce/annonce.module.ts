import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { PushNotificationModule } from 'notifications/push-notification.module';
import { UserModule } from 'user/user.module';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  imports: [PushNotificationModule, UserModule],
  providers: [AnnonceService, PrismaService],
  controllers: [AnnonceController]
})
export class AnnonceModule {}
