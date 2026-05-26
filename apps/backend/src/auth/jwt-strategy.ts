import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { id: string; sub: string }) {
    const { id } = payload;
    const user = await this.sql.query`SELECT * FROM users WHERE id = ${id}`;
    if (!user || user.rows.length === 0) {
      throw new UnauthorizedException('Please log in first');
    }
    return user.rows[0];
  }
}
