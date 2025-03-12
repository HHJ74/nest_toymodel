import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '정혜현 백엔드 토이 프로젝트';
  }
}
