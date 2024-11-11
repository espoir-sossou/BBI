import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { PushNotificationModule } from 'src/notifications/push-notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PushNotificationModule, UserModule],
  providers: [AnnonceService],
  controllers: [AnnonceController]
})
export class AnnonceModule {}
