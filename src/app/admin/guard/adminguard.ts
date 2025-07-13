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
import * as jwt from 'jsonwebtoken';
import {
  JwtPayload,
  JsonWebTokenError,
  TokenExpiredError,
} from 'jsonwebtoken';

import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';
import { AdminService } from '../services/admin.service';
import { Admin } from '../../../shared/schemas/admin.schema';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<
      IncomingMessage & { user?: Admin }
    >();

    try {
      const token = this.extractToken(request);
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded?.sub && !decoded?.id) {
        throw new UnauthorizedException('Malformed token');
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ADMIN_SECRET'),
      });
      const admin = await this.adminService.findOne({
        _id: payload.sub || payload.id,
      });

      if (!admin) {
        throw new ForbiddenException('Access denied: Not an admin');
      }
      request.user = admin;
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) {
        throw err;
      }
      if (err instanceof JsonWebTokenError && err.message === 'invalid signature') {
        throw new ForbiddenException('Access denied: Not an admin');
      }
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new UnauthorizedException('Unauthorized request');
    }
  }

  private extractToken(request: IncomingMessage): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing Authorization header');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization format');
    }
    return token;
  }
}
