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
import { EmailConfirmationGuard } from '@src/shared/guards/email-confirmation.guard';

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

  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Get('teachers')
  getAllTeachers() {
    return this.usersService.getTeachers();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Get('searchByRole')
  getUserByRole(@Query('role') role: RoleTypeEnum) {
    return this.usersService.findUsersByRole(role);
  }
}
