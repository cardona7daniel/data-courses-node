import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleTypeEnum } from '../../shared/interfaces/role.enum';

export class UserDto {
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: RoleTypeEnum;
}
