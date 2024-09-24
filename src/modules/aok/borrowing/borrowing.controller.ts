import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { JwtAuthGuard } from '../../authentication/auth/jwt-auth.guard';

@Controller('borrowing')
@UseGuards(JwtAuthGuard)
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Get()
  async getAll(@Req() req, @Res() res) {
    try {
      const query: any = { delete_at: null };
      const data = await this.borrowingService.getAll(req, query);

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

  @Patch()
  async update(@Req() req, @Res() res) {
    try {
      req.body.delete_at = null;
      const data = await this.borrowingService.update(req);

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
      const data = await this.borrowingService.findOne(req);

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

  @Patch('multi/trash')
  async multiTrash(@Req() req, @Res() res) {
    const data = this.borrowingService.multiTrash(req);
    return res.status(201).json({
      message: 'success',
      data: req.body.ids,
    });
  }

  @Patch('multi/restore')
  async multiRestore(@Req() req, @Res() res) {
    // const query = de
    const data = await this.borrowingService.multiRestore(req);
    return res.status(201).json({
      message: 'success',
      data: req.body.ids,
    });
  }

  @Get('trash')
  async getTrash(@Req() req, @Res() res) {
    try {
      const query: any = { delete_at: { $ne: null } };
      const data = await this.borrowingService.getTrash(req, query);

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

  @Post('multi/delete')
  async delete(@Req() req, @Res() res) {
    try {
      console.log('multi delete');

      const data = await this.borrowingService.multiDelete(req);

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
