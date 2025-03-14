import { Controller, Post, Body, HttpCode, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: { kakao_id: number; nickname: string }) {
    const { kakao_id, nickname } = body;
    const user = await this.usersService.createOrGetUser(kakao_id, nickname); // 새 메서드 호출
    return { message: '로그인 성공', user };
  }
  
  // 새로 추가: 모든 사용자 조회
  @Get('users')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { message: '사용자 목록', users };
  }

  // 특정 kakao_id로 사용자 조회
  @Get('user/:kakao_id')
  async getUserByKakaoId(@Param('kakao_id') kakao_id: string) {
    const user = await this.usersService.getUserByKakaoId(+kakao_id); // string -> number 변환
    return { message: '사용자 조회 성공', user };
  }
}