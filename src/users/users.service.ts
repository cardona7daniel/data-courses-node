import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MySqlErrorCode from '@src/shared/database/mysqlErrorCodes.enum';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';
import { createQueryBuilder, getRepository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: UserDto) {
    try {
      const user = User.create(createUserDto);
      await user.save();
      delete user.password;
      return user;
    } catch (error) {
      if (error?.code === MySqlErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error?.code === MySqlErrorCode.TruncatedData) {
        throw new HttpException(
          'The information you are trying to save does not have the correct structure',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers() {
    return await User.find();
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException(
        `User with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    delete user.password;
    return user;
  }

  async findById(id: number) {
    const user = await User.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      `User with id ${id} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async findUsersByRole(role: RoleTypeEnum) {
    if (!role) {
      throw new HttpException('Role is empty', HttpStatus.NOT_FOUND);
    }
    const user = await User.find({
      where: {
        role,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      `Users with role ${role} do not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new HttpException('Email is empty', HttpStatus.NOT_FOUND);
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      `User with email ${email} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async markEmailAsConfirmed(email: string) {
    return await User.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async getTeachers() {
    try {
      const users = await createQueryBuilder()
        .select('user.id')
        .addSelect('AVG(r.score)', 'score')
        .from(User, 'user')
        .innerJoin('user.rankings', 'r')
        .where('user.role = :role', { role: RoleTypeEnum.TEACHER })
        .groupBy('user.email')
        .getRawMany();

      if (users) {
        return users;
      }
    } catch (error) {
      throw new HttpException(
        'Has ocurred an error getting the information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async remove(id: string): Promise<void> {
  //   await this.notesRepository.delete(id);
  // }

  // async editNote(id: number, note: Note): Promise<Note> {
  //   const editedNote = await this.notesRepository.findOne(id);
  //   if (!editedNote) {
  //     throw new NotFoundException('Note is not found');
  //   }
  //   editedNote.description = note.description;
  //   editedNote.title = note.title;
  //   await editedNote.save();
  //   return editedNote;
  // }
}
