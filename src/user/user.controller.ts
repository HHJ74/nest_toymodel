import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: { kakao_id: number; nickname: string }) {
    const { kakao_id, nickname } = body;
    const user = await this.usersService.createUser(kakao_id, nickname);
    return { message: '회원가입 성공', user };
  }
}