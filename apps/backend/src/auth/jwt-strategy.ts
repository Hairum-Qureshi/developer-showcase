import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

const cookieExtractor = (request: Request): string | null => {
  const token = request?.cookies?.['auth-session'];
  return token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { id?: string; user_id?: string; sub: string }) {
    const userId = payload.user_id || payload.id;
    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.sql`SELECT * FROM users WHERE user_id = ${userId}`;
    if (!user || !user.length) {
      throw new UnauthorizedException('Please log in first');
    }

    return user[0];
  }
}
