import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmailConfirmationGuard } from '@src/shared/guards/email-confirmation.guard';
import RoleGuard from '@src/shared/guards/role.guard';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(EmailConfirmationGuard)
  @UseGuards(RoleGuard(RoleTypeEnum.STUDENT))
  @Get()
  async test() {
    return 'Success!';
  }
}
