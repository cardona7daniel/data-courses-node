import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secretToken'),
    });
  }

  async validate(payload: {
    userId: number;
    role: RoleTypeEnum;
    isEmailConfirmed: boolean;
  }) {
    return {
      userId: payload.userId,
      role: payload.role,
      isEmailConfirmed: payload.isEmailConfirmed,
    };
  }
}
