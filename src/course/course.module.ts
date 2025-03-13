import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]) 
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
