import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "src/prisma/prisma.service";

type Payload = {
    sub: number,
    email: string,
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("SECRET_KEY"), // Assurez-vous que le secret est bien configuré
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const user = await this.prismaService.user.findUnique({
            where: { email: payload.email },
        });

        if (!user) throw new UnauthorizedException('Non autorisé à accéder à cette route');

        // Supprimer le mot de passe avant de renvoyer l'utilisateur
        Reflect.deleteProperty(user, "password");

        // Retourner l'utilisateur avec userId et sub pour un accès correct dans req.user
        return { ...user, userId: user.user_id, sub: payload.sub };
    }
}
