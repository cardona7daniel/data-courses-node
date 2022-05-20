import { IsString, MaxLength, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserByCourse } from '@src/users/entities/user-courses.entity';
import { CourseContent } from './course-content.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @MinLength(1)
  @MaxLength(50)
  @IsString()
  name: string;

  @OneToMany((type) => UserByCourse, (usercourse) => usercourse.course, {
    onDelete: 'CASCADE',
  })
  userByCourses: UserByCourse[];
  @OneToMany((type) => CourseContent, (coursecontent) => coursecontent.course, {
    onDelete: 'CASCADE',
  })
  coursesByContents: CourseContent[];
}
