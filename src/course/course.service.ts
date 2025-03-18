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

  // 코스 저장 
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
  // 사용자별 코스 조회
  async getCoursesByUser(user_id: number): Promise<Course[]> {
    const courses = await this.courseRepository.find({
      where: { user_id },
    });
    console.log('Fetched courses for user_id:', user_id, courses);
    return courses;
  }

  // 특정 위치 근처 코스 검색
  async getCoursesNearLocation(latitude: number, longitude: number, radius: number): Promise<any[]> {
    const courses = await this.courseRepository.query(`
      SELECT course_id, user_id, content, status, created_at, deleted_at,
             ST_AsGeoJSON(course_line)::json AS course_line
      FROM toymodel.courses
      WHERE ST_DWithin(
        course_line,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geometry,
        $3
      )
    `, [longitude, latitude, radius]);
  
    console.log('Fetched nearby courses:', courses);
    return courses;
  }
}