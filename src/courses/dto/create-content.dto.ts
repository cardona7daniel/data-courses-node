import { IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  description: string;

  @IsNumber()
  courseId: number;
}
