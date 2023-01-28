import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export type IUser = {
  id: number,
  name: string
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async getUsers() {
    return this.userRepository.find({})
  }

  async postUser() {
    return this.userRepository.save({ name: "Mahima Chaudhary" })
  }
}
