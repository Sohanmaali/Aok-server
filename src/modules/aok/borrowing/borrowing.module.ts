import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Borrowing, BorrowingSchema } from './entities/borrowing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Borrowing', schema: BorrowingSchema }]),
  ],
  providers: [BorrowingService],
  controllers: [BorrowingController],
})
export class BorrowingModule {}
