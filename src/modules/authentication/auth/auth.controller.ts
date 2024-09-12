import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminLocalStrategy } from './local.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('admin/login')
  async login(@Req() req) {
    console.log(req.body);

    return this.authService.login(req.body);
  }

  // Admin change password
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Request() req, @Body() changePasswordDto: any) {
    //  return this.authService.changePassword(req.user, changePasswordDto);
  }
}