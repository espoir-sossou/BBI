// src/notifications/pushNotification.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PushNotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async sendPushNotificationToAdmin(message: string, adminId: number) {
    await this.prismaService.notification.create({
      data: {
        contenu: message,
        type: 'Notification Push',
        userId: adminId,
        dateEnvoi: new Date(),
      },
    });
  }
}
