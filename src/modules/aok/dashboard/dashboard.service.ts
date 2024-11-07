import { Injectable } from '@nestjs/common';
import { Customer } from '../../authentication/customer/entities/customer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CustomPagination } from '../../../cms/helper/piplineHalper';
import { CmsHelper } from '../../../cms/helper/cmsHelper';
// import { Customer } from './Customer.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getDashboardCounting(req) {
    const customerCount = await this.customerModel.countDocuments();
    // return this.customerModel.countDocuments();

    return { customerCount: customerCount };
    // return data;
  }
}
