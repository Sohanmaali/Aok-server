import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
// import { AuthGuard } from '@nestjs/passport';

// UseGuards(AuthGuard);
@Controller('admin')
export class AdminController {
  constructor(private adminservice: AdminService) {}

  @Get('get')
  getAdmin(@Req() req) {
    console.log();

    return { message: 'Protected admin route' };
  }
}
