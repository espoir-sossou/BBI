import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SignupDto } from '../dto/user/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from '../dto/user/signinDto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';  // Assurez-vous d'importer Response de 'express'
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'decorator/public.decorator';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
    @Post('login')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() { }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleAuthCallback(@Req() req, @Res() res: Response) {
        console.log('Callback request:', req.user);  // Loggez l'utilisateur reçu dans le callback

        if (!req.user) {
            throw new Error('User not found');  // Ajoutez une erreur si l'utilisateur est manquant
        }

        // Récupérer les informations de l'utilisateur
        const user = req.user;

        // Construire l'URL de redirection vers Laravel avec les données utilisateur
        const userData = {
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
            telephone: user.telephone,
        };

        const redirectUrl = `https://bbi-web-production.up.railway.app?email=${encodeURIComponent(userData.email)}&nom=${encodeURIComponent(userData.nom)}&prenom=${encodeURIComponent(userData.prenom)}&role=${encodeURIComponent(userData.role)}&telephone=${encodeURIComponent(userData.telephone)}`;

        // Rediriger vers Laravel avec les données de l'utilisateur
        return res.redirect(redirectUrl);  // Effectuer la redirection vers Laravel
    }

    @Post('google/logout')
    @UseGuards(AuthGuard('jwt'))  // Protégez l'endpoint pour les utilisateurs authentifiés
    async logout(@Req() req, @Res() res: Response) {
        try {
            // Supprimez le token côté client en envoyant une réponse sans cookie
            res.clearCookie('jwt');  // Supprimez le cookie contenant le token (si vous l'avez stocké dans un cookie)
            return res.status(200).json({
                status: '0000',
                message: 'Déconnexion réussie',
            });
        } catch (error) {
            return res.status(500).json({
                status: '5000',
                message: 'Erreur lors de la déconnexion',
            });
        }
    }

}
