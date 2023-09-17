import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../lib/decorators/user';
import { User } from '../../entities/user';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transaction')
@ApiBearerAuth('Auth')
@UseGuards(AuthGuard)
@ApiTags('Transaction controller')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('get-all-transactions')
  getAllTransactions(@GetUser() user: User) {
    return this.transactionService.getListByUserId(user.id);
  }
}
