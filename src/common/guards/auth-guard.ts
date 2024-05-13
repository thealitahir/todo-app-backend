import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import * as jwt from 'jsonwebtoken';

import { generateToken } from 'src/modules/auth/helper-functions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      // Verifying Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'NO_SECRET');
      request.user = decoded;
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Token expired, refresh token
        const refreshedToken = this.refreshToken(token);
        request.headers.authorization = `Bearer ${refreshedToken}`;
        const decoded = jwt.verify(refreshedToken, process.env.JWT_SECRET ?? 'NO_SECRET');
        request.user = decoded;
        return true;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  private extractToken(request): string | null {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return null;
    }
    const [, token] = authorizationHeader.split(' ');
    return token;
  }

  private refreshToken(token: string): string {
    const decoded = jwt.decode(token);
    const payload = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    }
    const refreshedToken = generateToken(payload) // Refresh token without setting expiresIn

    return refreshedToken;
  }
}
