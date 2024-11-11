import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clinetID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.authService.findOrCreateUserFromGoogle(profile);

    if (!user) {
        return done(null, false); // Si l'utilisateur n'est pas trouvé ou créé
    }

    // Récupérer les informations nécessaires pour la redirection
    const userData = {
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        telephone: user.telephone,
    };

    // Créer l'URL de redirection avec les informations de l'utilisateur
    const redirectUrl = `http://127.0.0.1:8000/homePage?email=${encodeURIComponent(userData.email)}&nom=${encodeURIComponent(userData.nom)}&prenom=${encodeURIComponent(userData.prenom)}&role=${encodeURIComponent(userData.role)}&telephone=${encodeURIComponent(userData.telephone)}`;

    // Rediriger vers Laravel avec les données de l'utilisateur
    done(null, user, { redirectUrl });
}


  

}