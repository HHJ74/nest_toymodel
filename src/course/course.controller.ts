import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entitiy';
import { courseNeaybySub } from './dto/bldg-nearby-dto';

@Controller('course')
export class CourseController {
    constructor(private CourseService: CourseService) {}

    @Get()
    async findAll(): Promise<Course[]>{
        return this.CourseService.findAll();
    }

    // @Get('nearby')
    // async FindNearby(@Query() quary:courseNeaybySub): Promise<Course[]>{
    //     return this.CourseService.findNearby(quary.x, quary.y, quary.radius);
    // }
}
