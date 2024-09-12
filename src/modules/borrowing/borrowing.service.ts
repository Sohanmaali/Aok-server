import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Borrowing } from './entities/borrowing.schema';

import { CmsHelper } from '../../cms/helper/cmsHelper';
// import { PaginationHelper } from 'src/cms/helper/piplineHalper';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectModel('Borrowing') private readonly borrowing: Model<Borrowing>,
  ) {
    console.log('UserService contructor');
  }

  async create(req) {
    // console.log('this.borrowing service', req.body);
    return await CmsHelper.create(req, this.borrowing);
  }

  async get(req) {
    return {}; // await PaginationHelper.paginate(req, this.borrowing);
  }

  async update(req) {
    return;
  }
}
