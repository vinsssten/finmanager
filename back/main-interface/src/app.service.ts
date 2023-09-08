import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers() {
    return this.userRepo.find();
  }
}
