import { BalanceService } from './balance.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../entities/user';
import { GetUser } from '../../lib/decorators/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('Auth')
@ApiTags('Balance controller')
@Controller('balance')
@UseGuards(AuthGuard)
export class BalanceController {
  constructor(private readonly userService: BalanceService) {}

  @Get('/all')
  getUserBalances(@GetUser() user: User) {
    return this.userService.getBalancesList(user.id);
  }
}
