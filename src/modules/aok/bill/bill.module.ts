import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from './entities/bill.schema';
import { CustomerModule } from '../../authentication/customer/customer.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }]),CustomerModule],

  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
