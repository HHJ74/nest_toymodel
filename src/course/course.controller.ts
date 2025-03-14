import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course-dto';


@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
ß
  @Post('/save-points')
  @HttpCode(HttpStatus.CREATED)
  async savePoints(@Body() createCourseDto: CreateCourseDto) {
    const savedCourse = await this.courseService.createCourse(createCourseDto);
    return {
      message: 'Route saved successfully',
      courseId: savedCourse.course_id,
    };
  }
}