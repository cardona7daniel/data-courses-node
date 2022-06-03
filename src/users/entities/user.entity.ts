import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Acceptance } from './acceptance.entity';
import { UserByCourse } from './user-courses.entity';
import { Ranking } from './ranking.entity';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @Column({ unique: true, length: 50 })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({
    type: 'enum',
    enum: RoleTypeEnum,
    default: RoleTypeEnum.STUDENT,
  })
  role: RoleTypeEnum;

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

  @OneToMany((type) => Acceptance, (acceptance) => acceptance.user, {
    onDelete: 'CASCADE',
  })
  acceptances: Acceptance[];
  @OneToMany((type) => UserByCourse, (userByCourse) => userByCourse.user, {
    onDelete: 'CASCADE',
  })
  userByCourses: UserByCourse[];
  @OneToMany((type) => Ranking, (ranking) => ranking.user, {
    onDelete: 'CASCADE',
  })
  rankings: Ranking[];
}
