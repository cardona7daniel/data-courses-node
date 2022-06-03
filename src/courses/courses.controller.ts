import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateContentDto } from './dto/create-content.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post('content')
  saveCourseContent(@Body() createContentDto: CreateContentDto) {
    return this.coursesService.saveCourseContent(createContentDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('coursesByUser')
  getCoursesByUser(@Query('userId') userId: string) {
    return this.coursesService.getCoursesByUser(+userId);
  }

  @Get('allContent')
  getAllContent() {
    return this.coursesService.findAllContent();
  }

  @Get('content')
  getContent(@Query('courseId') courseId: string) {
    return this.coursesService.getContentByCourse(+courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.showById(+id);
  }
}
