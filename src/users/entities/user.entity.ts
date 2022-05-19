import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.entity';
import { Acceptance } from './acceptance.entity';
import { UserByCourse } from './user-courses.entity';
import { Ranking } from './ranking.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @ManyToOne((type) => Role, (role) => role.users) role: Role;
  @OneToMany((type) => Acceptance, (acceptance) => acceptance.user)
  acceptances: Acceptance[];
  @OneToMany((type) => UserByCourse, (userByCourse) => userByCourse.user)
  userByCourses: UserByCourse[];
  @OneToMany((type) => Ranking, (ranking) => ranking.user)
  rankings: Ranking[];
}
