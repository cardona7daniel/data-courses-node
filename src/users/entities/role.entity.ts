import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';
import { User } from './user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleTypeEnum,
    default: RoleTypeEnum.STUDENT,
  })
  format: RoleTypeEnum;

  @OneToMany((type) => User, (user) => user.role) users: User[];
}
