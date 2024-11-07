import { Module } from '@nestjs/common';
import { AokService } from './aok.service';
import { AokController } from './aok.controller';
import { BorrowingModule } from './borrowing/borrowing.module';
import { BillModule } from './bill/bill.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [BorrowingModule, BillModule, DashboardModule],
  providers: [AokService],
  controllers: [AokController],
})
export class AokModule {}
