import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResendConfirmDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export default ResendConfirmDto;
