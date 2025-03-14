import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course-dto';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { user_id, content, points, status } = createCourseDto;

    // 포인트 배열을 GeoJSON LineString으로 변환
    const course_line = {
      type: 'LineString',
      coordinates: points.map(point => [point.longitude, point.latitude]), // [경도, 위도] 순서
    };

    const course = this.courseRepository.create({
      user_id,
      content,
      course_line,
      status,
    });

    return this.courseRepository.save(course);
  }
}