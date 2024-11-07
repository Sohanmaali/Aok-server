import { Injectable } from '@nestjs/common';
import { CmsHelper } from '../../../cms/helper/cmsHelper';
import { Bill } from './entities/bill.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateBillNumber } from '../../../cms/helper/commonhelper';
import { CustomPagination } from '../../../cms/helper/piplineHalper';
import { CustomerService } from '../../authentication/customer/customer.service';
@Injectable()
export class BillService {
  constructor(
    @InjectModel('Bill') private readonly bill: Model<Bill>,
    private readonly customerService: CustomerService,
  ) {}

  // async create(req) {
  // const bill_number = await generateBillNumber(req, this.bill);
  //   if (bill_number) {
  //     req.body.bill_number = bill_number;

  //     const data = CmsHelper.create(req, this.bill);
  //     return data;
  //   } else {
  //     throw new Error('Bill number could not be generated.');
  //   }
  // }

  async create(req) {
    const { mobile } = req.body;

    //     // Check if mobile number exists in request body
    if (!mobile) {
      throw new Error('Mobile number is required to create a bill.');
    }

    //     // Check if customer exists with this mobile number
    const existingCustomer = await this.customerService.findByType(req);
    console.log('existingCustomer', existingCustomer);

    let customerId: any;
    if (existingCustomer) {
      customerId = existingCustomer._id; // Assuming the customer object has an _id property
    } else {
      // If customer doesn't exist, create a new customer
      const newCustomer = await this.customerService.create(req); // Create customer with details from req.body
      customerId = newCustomer._id;
    }

    //     // Assign customerId to the bill data
    req.body.customerId = customerId;

    //     // Generate a bill number
    const bill_number = await generateBillNumber(req, this.bill);
    if (bill_number) {
      req.body.bill_number = bill_number;

      //         // Create the bill using CmsHelper
      const data = await CmsHelper.create(req, this.bill);
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

  async search(req, query?) {
    console.log('----------->>>>>');

    const data = await CmsHelper.search(req, this.bill);
    return data;
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

  async printBill(req) {
    const reqData = await CmsHelper.findOne(req, this.bill);
    if (reqData) {
      return await CmsHelper.generatePDF(reqData);
    }
    return null;
  }
}
