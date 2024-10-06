import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Borrowing } from './entities/borrowing.schema';

import { CmsHelper } from '../../../cms/helper/cmsHelper';
import { CustomPagination } from '../../../cms/helper/piplineHalper';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectModel('Borrowing') private readonly borrowing: Model<Borrowing>,
  ) {}

  async create(req) {
    return await CmsHelper.create(req, this.borrowing);
  }

  async getAll(req, query?) {
    const pipeline = [
      {
        $match: query,
      },
      {
        $sort: { created_at: -1 },
      },
    ];

    return await CustomPagination(req, pipeline, this.borrowing);
  }
  async getTrash(req, query?) {
    const pipeline = [
      {
        $match: query,
      },
      {
        $sort: { created_at: -1 },
      },
    ];

    return await CustomPagination(req, pipeline, this.borrowing);
  }

  async findOne(req) {
    const id = req.params.id;
    const data = await CmsHelper.findOne(req, this.borrowing);
    return data;
  }

  async update(req) {
    const data = await CmsHelper.update(req, this.borrowing);
    return;
  }
  async multiTrash(req) {
    const data = await CmsHelper.multiTrash(req, this.borrowing);
    return data;
  }

  async multiRestore(req, query?) {
    const data = await CmsHelper.multiRestore(req, this.borrowing);
    return data;
  }

  async multiDelete(req, query?) {
    const data = await CmsHelper.multiDelete(req, this.borrowing);
    return data;
  }
}
