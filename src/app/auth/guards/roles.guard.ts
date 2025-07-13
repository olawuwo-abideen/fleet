import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { Types } from 'mongoose'; 

import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';
import { ROLES_KEY } from '../../../shared/decorators/roles.decorator';
import { User } from '../../../shared/schemas/user.schema';
import { Role } from '../../auth/enums/role.enum';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = this.getRequest<IncomingMessage & { user?: User }>(context);

    try {
      const user = await this.validateUser(request);
      request.user = user;

      return this.checkAuthorization(user, context);
    } catch (err) {
      throw err;
    }
  }

  private async validateUser(request: IncomingMessage & { user?: User }): Promise<User> {
    const token = this.extractToken(request);

    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const user = await this.userService.findOne({ _id: new Types.ObjectId(payload.id) });

    if (!user) {
      throw new UnauthorizedException('Invalid token: user not found');
    }

    if (!user.accountActivation) {
      throw new ForbiddenException('Your account is not activated. Contact the admin.');
    }

    user.password = undefined;
    return user;
  }

  private checkAuthorization(user: User, context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('Access denied: insufficient role.');
    }

    return true;
  }

  private getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  private extractToken(request: IncomingMessage): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    return token;
  }
}
