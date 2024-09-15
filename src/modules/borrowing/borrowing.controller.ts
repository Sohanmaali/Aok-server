import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { PaginationHelper } from 'src/cms/helper/piplineHalper';
import { JwtAuthGuard } from '../authentication/auth/jwt-auth.guard';

@Controller('borrowing')
@UseGuards(JwtAuthGuard)
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Get()
  async get(@Req() req, @Res() res) {
    try {
      console.log('controller ', process.env.JWT_SECRET);
      const data = { text: 'borrowing' }; //this.borrowingService.get(req);
      return res.status(201).json({
        message: 'success',
        data: req.body,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        message: 'error',
        data: error.message,
      });
    }
  }

  @Post()
  async create(@Req() req, @Res() res) {
    try {
      const data = await this.borrowingService.create(req);

      return res.status(201).json({
        message: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        message: 'error',
        data: error.message,
      });
    }
  }
}
