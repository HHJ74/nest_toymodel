import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { SubPtModule } from './sub_pt/sub_pt.module';
import * as dotenv from 'dotenv';
import { SubStations } from './sub_pt/sub_pt.entitiy';
import { UserModule } from './user/user.module';

dotenv.config(); // .env 파일 로드

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.CLOUDSQL_HOST || `/cloudsql/${process.env.CLOUDSQL_INSTANCE_CONNECTION_NAME}` // Cloud Run 환경 분기
      , 
      port: parseInt(process.env.CLOUDSQL_PORT || '5432'),
      username: process.env.CLOUDSQL_USER,
      password: process.env.CLOUDSQL_PASS,
      database: process.env.CLOUDSQL_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: [SubStations],
      synchronize: false, //true는 개발모드에서만
    }),
    CourseModule,
    SubPtModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
