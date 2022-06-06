import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/guards/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { CreateContentDto } from './dto/create-content.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('content')
  saveCourseContent(@Body() createContentDto: CreateContentDto) {
    return this.coursesService.saveCourseContent(createContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('coursesByUser')
  getCoursesByUser(@Query('userId') userId: string) {
    return this.coursesService.getCoursesByUser(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allContent')
  getAllContent() {
    return this.coursesService.findAllContent();
  }

  @UseGuards(JwtAuthGuard)
  @Get('content')
  getContent(@Query('courseId') courseId: string) {
    return this.coursesService.getContentByCourse(+courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.showById(+id);
  }
}
