import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationHelper {
  static async paginate(req, model) {
    const page = parseInt(req.query.page) || 1;
    const rowsPerPage = parseInt(req.query.rowsPerPage) || 20;

    const skip = (page - 1) * rowsPerPage;

    const [data, totalRows] = await Promise.all([
      model.find().skip(skip).limit(rowsPerPage).exec(),
      model.countDocuments().exec(),
    ]);

    return {
      currentPage: page,
      rowsPerPage,
      totalData: totalRows,
      totalPages: Math.ceil(totalRows / rowsPerPage),
      data,
    };
  }
}
