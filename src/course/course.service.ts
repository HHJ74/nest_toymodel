import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseReopsitory: Repository<Course>
    ){}

    async findAll():Promise<Course[]> {
        return this.courseReopsitory.find();
    }

    async findNearby(x:number, y:number, radius:number): Promise<Course[]>{
        return this.courseReopsitory
        .createQueryBuilder('courses')
        .where(
            `ST_Distance(
                ST_SetSRID(ST_MakePoint(:x, :y),4326)::geography,
                courses.course_line::geography
                ) <= :radius`,
            {x, y, radius},
        )
        .getMany();
    }
}
