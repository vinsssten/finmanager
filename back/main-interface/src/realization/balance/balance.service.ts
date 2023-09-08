import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from '../../entities/balance';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance) private balanceRepo: Repository<Balance>,
  ) {}

  // TODO проверка на принадлежность баланса конкретному пользователю
  async changeBalanceAmount(balanceId: number, amount: number) {
    console.log(balanceId, amount);
  }

  getById(id: number) {
    return this.balanceRepo.findOneBy({ id });
  }
}
