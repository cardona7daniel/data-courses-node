import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { EmailConfirmationService } from '@src/auth/email/email-confirmation.service';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';
import { JwtAuthGuard } from '@src/shared/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post()
  async register(@Body() createUserDto: UserDto) {
    const user = await this.usersService.create(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(
      createUserDto.email,
    );
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  getAllTeachers() {
    return this.usersService.getTeachers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('searchByRole')
  getUserByRole(@Query('role') role: RoleTypeEnum) {
    return this.usersService.findUsersByRole(role);
  }
}
