import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, ParseIntPipe, Query, ParseFloatPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course-dto';


@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/save-points')
  @HttpCode(HttpStatus.CREATED)
  async savePoints(@Body() createCourseDto: CreateCourseDto) {
    const savedCourse = await this.courseService.createCourse(createCourseDto);
    return {
      message: 'Route saved successfully',
      courseId: savedCourse.course_id,
    };
  }
  // 사용자별 코스 조회
  @Get('/user/:user_id')
  async getCoursesByUser(@Param('user_id', ParseIntPipe) user_id: number) {
    try {
      const courses = await this.courseService.getCoursesByUser(user_id);
      return {
        message: 'Courses retrieved successfully',
        courses,
      };
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }
  }

  // 특정 위치 근처 코스 검색
  @Get('/nearby')
  async getCoursesNearLocation(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('radius', ParseIntPipe) radius: number,
  ) {
    try {
      const courses = await this.courseService.getCoursesNearLocation(latitude, longitude, radius);
      return {
        message: 'Nearby courses retrieved successfully',
        courses,
      };
    } catch (error) {
      console.error('Error fetching nearby courses:', error);
      throw new Error(`Failed to fetch nearby courses: ${error.message}`);
    }
  }
}