import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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

  @Column()
  courseId: number;

  @OneToMany((type) => Acceptance, (acceptance) => acceptance.courseContent, {
    onDelete: 'CASCADE',
  })
  acceptances: Acceptance[];

  @ManyToOne((type) => Course, (course) => course.coursesByContents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId', referencedColumnName: 'id' })
  course: Course;
}
