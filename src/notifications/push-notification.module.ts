// push-notification.module.ts
import { Module } from '@nestjs/common';
import { PushNotificationService } from './pushNotification.service';

@Module({
  providers: [PushNotificationService],
  exports: [PushNotificationService], // Assurez-vous d'exporter le service
})
export class PushNotificationModule {}
