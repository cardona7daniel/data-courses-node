import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Acceptance } from '@src/users/entities/acceptance.entity';
import { Course } from './course.entity';

@Entity('course_content')
export class CourseContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @MinLength(1)
  @MaxLength(500)
  @IsString()
  description: string;

  @OneToMany((type) => Acceptance, (acceptance) => acceptance.courseContent)
  acceptances: Acceptance[];
  @ManyToOne((type) => Course, (course) => course.coursesByContents)
  course: Course;
}
