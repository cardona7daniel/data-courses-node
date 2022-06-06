import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MySqlErrorCode from '@src/shared/database/mysqlErrorCodes.enum';
import { RoleTypeEnum } from '@src/shared/interfaces/role.enum';
import { UserByCourse } from '@src/users/entities/user-courses.entity';
import { User } from '@src/users/entities/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseContent } from './entities/course-content.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async saveCourseContent(createContentDto: CreateContentDto) {
    try {
      const content = CourseContent.create(createContentDto);
      await content.save();
      return content;
    } catch (error) {
      if (error?.code === MySqlErrorCode.TruncatedData) {
        throw new HttpException(
          'The information you are trying to save does not have the correct structure',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await Course.find();
  }

  async showById(id: number): Promise<Course> {
    const course = await this.findById(id);

    if (!course) {
      throw new HttpException(
        `Course with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async findById(id: number) {
    const course = await Course.findOne(id);
    if (course) {
      return course;
    }
    throw new HttpException(
      `Course with id ${id} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }

  async getCoursesByUser(id: number) {
    try {
      const courses = await createQueryBuilder(Course, 'c')
        .select(['c.id', 'c.name'])
        .innerJoin('c.userByCourses', 'uc')
        .innerJoin('uc.user', 'u')
        .where('u.id = :id', { id })
        .andWhere('u.role = :role', { role: RoleTypeEnum.TEACHER })
        .getMany();
      return courses;
    } catch (error) {
      throw new HttpException(
        'Has ocurred an error getting the information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getContentByCourse(id: number) {
    try {
      const content = await createQueryBuilder(CourseContent, 'cc')
        .select(['cc.id', 'cc.description'])
        .innerJoin('cc.course', 'c')
        .where('c.id = :id', { id })
        .getMany();
      return content;
    } catch (error) {
      throw new HttpException(
        'Has ocurred an error getting the information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllContent() {
    return await CourseContent.find();
  }
}
