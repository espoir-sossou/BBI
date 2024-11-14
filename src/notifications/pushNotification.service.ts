// src/notifications/pushNotification.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PushNotificationService {
    constructor(private readonly prismaService: PrismaService) {}

    async sendPushNotificationToAdmin(message: string) {
        const adminUsers = await this.prismaService.user.findMany({
            where: { role: 'ADMIN' },
            select: { user_id: true },
        });

        // Créer une notification dans la base de données pour chaque administrateur
        for (const admin of adminUsers) {
            await this.prismaService.notification.create({
                data: {
                    contenu: message,
                    type: 'Notification Push',
                    userId: admin.user_id,
                    dateEnvoi: new Date(),
                },
            });
        }
    }
}
