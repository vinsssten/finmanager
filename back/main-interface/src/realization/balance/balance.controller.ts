import { BalanceService } from './balance.service';
import { Controller } from '@nestjs/common';

@Controller('balance')
export class BalanceController {
  constructor(private readonly userService: BalanceService) {}

  getBalanceById() {
    return this.userService;
  }
}
