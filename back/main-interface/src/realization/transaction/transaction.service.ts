import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PnlTransaction } from '../../entities/pnl_transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(PnlTransaction)
    private pnlTransactionRepo: Repository<PnlTransaction>,
  ) {}

  getListByBalanceId(balanceId: number) {
    return this.pnlTransactionRepo.find({
      where: { balanceId: balanceId },
      order: { id: 'desc' },
    });
  }

  getListByUserId(userId: number): Promise<PnlTransaction[]> {
    return this.pnlTransactionRepo.query(
      `SELECT * from pnl_transaction 
            WHERE balance_id in ( SELECT id FROM balance WHERE balance.user_id = $1 )`,
      [userId],
    );
  }
}
