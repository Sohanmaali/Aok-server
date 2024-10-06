import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from './entities/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { CustomPagination } from '../../../cms/helper/piplineHalper';
import { CmsHelper } from '../../../../src/cms/helper/cmsHelper';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private adminModel: Model<Admin>,
    // private readonly authService: AuthService,
  ) {}
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminModel.findOne({ email }).exec();
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  async changePassword(adminId: number, changePasswordDto: any) {
    const admin = this.adminModel.find((admin) => admin.id === adminId);
    if (admin) {
      // admin.password = changePasswordDto.newPassword;
      return { success: true, message: 'Password changed successfully' };
    }
    return { success: false, message: 'Admin not found' };
  }
  async create(req) {
    const { password, ...otherDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({
      ...otherDetails,
      password: hashedPassword,
    });
    return await newAdmin.save();
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

    return await CustomPagination(req, pipeline, this.adminModel);
  }

  async findOne(req) {
    return await CmsHelper.findOne(req, this.adminModel);
  }

  async findAndUpdate(req, query?) {
    return await CmsHelper.update(req, this.adminModel);
  }
}
