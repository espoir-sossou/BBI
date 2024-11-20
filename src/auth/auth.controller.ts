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

        const redirectUrl = `https://bbi-application-production-7c97.up.railway.app/?email=${encodeURIComponent(userData.email)}&nom=${encodeURIComponent(userData.nom)}&prenom=${encodeURIComponent(userData.prenom)}&role=${encodeURIComponent(userData.role)}&telephone=${encodeURIComponent(userData.telephone)}`;

        // Rediriger vers Laravel avec les données de l'utilisateur
        return res.redirect(redirectUrl);  // Effectuer la redirection vers Laravel
    }

    @Post('google/logout')
    @UseGuards(AuthGuard('jwt')) // Assurez-vous que seul un utilisateur authentifié peut accéder à cette route
    async logout(@Req() req, @Res() res: Response) {
        try {
            const isGoogleAuth = req.user?.isGoogleAuth; // Vérifiez si l'utilisateur est connecté via Google
            
            // Supprimez le token JWT du cookie, s'il y en a un
            res.clearCookie('jwt'); 
            
            if (isGoogleAuth) {
                // Gérer la déconnexion spécifique à Google si nécessaire
                // Appel à un service pour révoquer le token Google, si nécessaire
            }
    
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
