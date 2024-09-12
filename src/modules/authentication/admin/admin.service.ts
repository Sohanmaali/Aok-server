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
}
