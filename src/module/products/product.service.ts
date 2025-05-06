import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schema/products.schema';
import { generateUniqueSlug } from 'src/utils/generateSlug';

export interface PayloadInsert {
  title: string;
  content: string;
  price: string;
  description: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<Products>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<any> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.productModel
        .find({ is_deleted: false })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // sắp xếp những bản ghi có ngày tạo mới nhất lên đầu
        .exec(),
      this.productModel.countDocuments({ is_deleted: false }),
    ]);

    return {
      status: HttpStatus.OK,
      data,
      pagination: {
        total, // tổng số bản ghi
        page, // số page
        limit, // số bản ghi mỗi page
        totalPages: Math.ceil(total / limit), // tổng số page
      },
      message: 'success',
    };
  }

  async create(payload: PayloadInsert): Promise<any> {
    const slugProduct = await generateUniqueSlug(
      this.productModel,
      payload.title,
    );
    const dataInsert = {
      ...payload,
      slug: slugProduct,
    };
    const response = await this.productModel.create(dataInsert);
    return {
      status: HttpStatus.CREATED,
      data: response.toObject(),
      message: 'success',
    };
  }
}
