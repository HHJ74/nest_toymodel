import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일 로드

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // 타입 변환 필요
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10), // 기본값 설정
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, //True는 개발모드에서만
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
