import { RoleTypeEnum } from '../interfaces/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
}

export class RoleDto {
  format: RoleTypeEnum;
}
