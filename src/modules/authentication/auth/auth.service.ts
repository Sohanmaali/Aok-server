// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
// import { AdminService } from '../admin/admin.service'; // Make sure this imports your Admin service

// @Injectable()
// export class AuthService {
//   constructor(
//     private adminService: AdminService,
//     private jwtService: JwtService,
//   ) {}

//   async validateAdmin(email: string, password: string): Promise<any> {
//     const admin = await this.adminService.findByEmail(email);

//     if (admin && (await bcrypt.compare(password, admin.password))) {
//       const { password, ...result } = admin.toObject();
//       return result;
//     }

//     return null;
//   }

//   // Generate JWT token after successful validation
//   async login(admin: any) {
//     const payload = { email: admin.email, sub: admin._id, role: admin.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
// import { ChangePasswordDto } from '../admin/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return admin;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(admin: any, changePasswordDto: any) {
    return this.adminService.changePassword(admin.id, changePasswordDto);
  }
}
