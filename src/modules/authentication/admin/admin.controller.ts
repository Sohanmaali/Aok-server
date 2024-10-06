import {
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
// import { AuthGuard } from '@nestjs/passport';

// UseGuards(JwtAuthGuard);
@Controller('admin')
@UseInterceptors(FileInterceptor('file'))
export class AdminController {
  constructor(private adminservice: AdminService) {
    console.log('admin controller loaded');
  }

  @Get()
  async getAllAdmin(@Req() req, @Res() res) {
    try {
      log(req);
      const data = await this.adminservice.getAll(req);

      return res.status(201).json({
        message: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }

  @Post()
  async create(@Req() req, @Res() res) {
    try {
      const data = { data: 'sohan' }; // await this.adminservice.create(req);

      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }

  @Get('show/:id')
  async findOne(@Req() req, @Res() res) {
    try {
      // console.log(process.env.DB_URL);

      const data = await this.adminservice.findOne(req);
      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }

  @Patch('update/:id')
  async update(@Req() req, @Res() res) {
    try {
      const data = await this.adminservice.findAndUpdate(req);
      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }
}
