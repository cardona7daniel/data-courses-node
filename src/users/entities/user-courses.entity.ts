import { CourseContent } from '@src/courses/entities/course-content.entity';
import { Course } from '@src/courses/entities/course.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('users_by_courses')
export class UserByCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.userByCourses, {
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne((type) => Course, (course) => course.userByCourses, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
