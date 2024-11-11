import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';  // Assurez-vous que l'importation du UserService est correcte

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService  // Injection de UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Récupère les rôles requis depuis le décorateur `Roles()`
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;  // Si aucune restriction de rôle, autoriser l'accès
    }

    // Récupère la requête et l'utilisateur
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // L'utilisateur doit déjà être injecté par AuthGuard('jwt')

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    // Récupère l'utilisateur depuis la base de données pour vérifier son rôle avec UserService
    const dbUser = await this.userService.getUserById(user.user_id);  // Assurez-vous que `user.user_id` existe

    if (!dbUser) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    // Vérifie si l'utilisateur a l'un des rôles requis
    return roles.some(role => role.toUpperCase() === dbUser.role.toUpperCase());
  }
}
