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
import { JwtAuthGuard } from '../../authentication/auth/jwt-auth.guard';
import { BillService } from './bill.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { get } from 'http';

@Controller('bill')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('file'))
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async getAll(@Req() req, @Res() res) {
    try {
      const query: any = { delete_at: null };
      const data = await this.billService.getAll(req, query);

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
      const data = await this.billService.create(req);

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

  @Get('search')
  async search(@Req() req, @Res() res) {
    try {
      console.log('callign------->>>>');

      const query: any = { delete_at: null };
      const data = await this.billService.search(req, query);

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

  @Patch()
  async update(@Req() req, @Res() res) {
    try {
      req.body.delete_at = null;
      const data = await this.billService.update(req);

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
      const data = await this.billService.findOne(req);

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
    const data = this.billService.multiTrash(req);
    return res.status(201).json({
      message: 'success',
      data: req.body.ids,
    });
  }

  @Patch('multi/restore')
  async multiRestore(@Req() req, @Res() res) {
    // const query = de
    const data = await this.billService.multiRestore(req);
    return res.status(201).json({
      message: 'success',
      data: req.body.ids,
    });
  }

  @Get('trash')
  async getTrash(@Req() req, @Res() res) {
    try {
      const query: any = { delete_at: { $ne: null } };
      const data = await this.billService.getTrash(req, query);

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

      const data = await this.billService.multiDelete(req);

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

  @Get('pdf/:id')
  async pdf(@Req() req, @Res() res) {
    // console.log('pdf call');
    try {
      const data = await this.billService.printBill(req);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=bill.pdf', // inline for viewing in browser
      });

      return res.send(data);
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
