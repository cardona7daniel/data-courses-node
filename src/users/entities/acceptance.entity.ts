import { CourseContent } from '@src/courses/entities/course-content.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('acceptance')
export class Acceptance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.acceptances) user: User;
  @ManyToOne(
    (type) => CourseContent,
    (courseContent) => courseContent.acceptances,
  )
  courseContent: CourseContent;
}
