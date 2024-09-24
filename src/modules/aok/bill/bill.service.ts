import { Injectable } from '@nestjs/common';
import { CmsHelper } from '../../../cms/helper/cmsHelper';
import { Bill } from './entities/bill.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateBillNumber } from '../../../cms/helper/commonhelper';
import { CustomPagination } from '../../../cms/helper/piplineHalper';
@Injectable()
export class BillService {
  constructor(@InjectModel('Bill') private readonly bill: Model<Bill>) {}

  async create(req) {
    const bill_number = await generateBillNumber(req, this.bill);
    if (bill_number) {
      req.body.bill_number = bill_number;

      const data = CmsHelper.create(req, this.bill);
      return data;
    } else {
      throw new Error('Bill number could not be generated.');
    }
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

    return await CustomPagination(req, pipeline, this.bill);
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

    return await CustomPagination(req, pipeline, this.bill);
  }

  async findOne(req) {
    const id = req.params.id;
    const data = await this.bill.findById({ _id: id });
    return data;
  }

  async update(req) {
    const data = await CmsHelper.update(req, this.bill);
    return;
  }
  async multiTrash(req) {
    const data = await CmsHelper.multiTrash(req, this.bill);
    return data;
  }

  async multiRestore(req, query?) {
    const data = await CmsHelper.multiRestore(req, this.bill);
    return data;
  }

  async multiDelete(req, query?) {
    const data = await CmsHelper.multiDelete(req, this.bill);
    return data;
  }
}
