import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findOneByLogin(login: string) {
    return this.userRepo.findOneBy({ login });
  }

  changePassword(id: number, password: string) {
    return this.userRepo.update({ id }, { password });
  }
}
