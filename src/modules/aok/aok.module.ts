import { Module } from '@nestjs/common';
import { AokService } from './aok.service';
import { AokController } from './aok.controller';
import { BorrowingModule } from './borrowing/borrowing.module';
import { BillModule } from './bill/bill.module';

@Module({
  imports: [BorrowingModule, BillModule],
  providers: [AokService],
  controllers: [AokController],
})
export class AokModule {}
