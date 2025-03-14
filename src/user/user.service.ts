import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(kakao_id: number, nickname: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { kakao_id } });
    if (existingUser) {
      throw new BadRequestException('이미 가입된 사용자입니다.');
    }

    const user = this.usersRepository.create({ kakao_id, nickname });
    return this.usersRepository.save(user);
  }
}