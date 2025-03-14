import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 회원가입 및 로그인
  async createOrGetUser(kakao_id: number, nickname: string): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { kakao_id } });
    if (!user) {
      // 새 사용자 생성
      user = this.usersRepository.create({ kakao_id, nickname });
      user = await this.usersRepository.save(user);
    }
    return user; // 기존 사용자면 바로 반환
  }

  // 모든 사용자 조회
  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // kakao_id로 사용자 조회
  async getUserByKakaoId(kakao_id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { kakao_id } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}