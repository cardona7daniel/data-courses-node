import { Max, Min } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('rankings')
export class Ranking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(0)
  @Max(5)
  score: number;

  @ManyToOne((type) => User, (user) => user.rankings, { onDelete: 'CASCADE' })
  user: User;
}
