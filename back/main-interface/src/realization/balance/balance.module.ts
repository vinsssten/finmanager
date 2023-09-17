import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from '../../entities/balance';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { AuthModule } from '../auth/auth.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Balance]), AuthModule, TransactionModule],
  providers: [BalanceService],
  controllers: [BalanceController],
  exports: [BalanceService],
})
export class BalanceModule {}
