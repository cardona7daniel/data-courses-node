import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@src/users/entities/user.entity';
import { UsersService } from '@src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const { id, password, ...dataWithoutPass } = await this.validateUser(
      authLoginDto,
    );

    const payload = {
      userId: id,
      role: dataWithoutPass.role,
      isEmailConfirmed: dataWithoutPass.isEmailConfirmed,
    };

    return {
      access_token: this.jwtService.sign(payload),
      ...dataWithoutPass,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
