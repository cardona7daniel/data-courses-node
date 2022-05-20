import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleTypeEnum } from '../../shared/interfaces/role.enum';

export class UserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role: RoleTypeEnum;
}
