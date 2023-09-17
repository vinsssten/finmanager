import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from '../../entities/balance';
import { Repository } from 'typeorm';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance) private balanceRepo: Repository<Balance>,
    private transactionService: TransactionService,
  ) {}

  async changeBalanceAmount(balanceId: number, amount: number) {
    console.log(balanceId, amount);
  }

  getById(id: number) {
    return this.balanceRepo.findOneBy({ id });
  }

  getBalancesList(userId: number) {
    return this.balanceRepo.findBy({ userId });
  }
}
