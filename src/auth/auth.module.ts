import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy.service';
import { MailModule } from '../mail/mail.module';  // Importez MailModule
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from 'user/user.module';



@Module({
  imports: [JwtModule.register({}), UserModule,MailModule, ConfigModule.forFeature(googleOauthConfig),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy,],
})
export class AuthModule {}
