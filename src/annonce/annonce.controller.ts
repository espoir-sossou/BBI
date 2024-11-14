// src/annonce/annonce.controller.ts

import { Controller, Post, Body,Request, UseGuards, Req } from '@nestjs/common';
import { AnnonceService } from './annonce.service';

import { AuthGuard } from '@nestjs/passport';

import { AuthenticatedRequest } from './interface/authenticated-request.interface';
import { RolesGuard } from 'guard/roles.guard';
import { MailService } from 'mail/mail.service';
import { PushNotificationService } from 'notifications/pushNotification.service';
import { Roles } from 'decorator/roles.decorator';
import { JwtAuthGuard } from 'guard/jwt-auth.guard';
import { CreateAnnonceDto } from 'dto/annonce/CreateAnnonceDto';




@UseGuards(AuthGuard('jwt'), RolesGuard)

@Controller('annonces')
export class AnnonceController {
    constructor(
        private readonly annonceService : AnnonceService,
        private readonly mailService: MailService,
        private readonly pushNotificationService: PushNotificationService
        
    ) {}

    @Roles('ADMIN', 'AGENCE', 'VENDEUR')
    @UseGuards(JwtAuthGuard)
    @Post('create')
  async createAnnonce(
    @Body() createAnnonceDto: CreateAnnonceDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user;
    return this.annonceService.createAnnonce(createAnnonceDto, user.sub);
  }
    
}    
