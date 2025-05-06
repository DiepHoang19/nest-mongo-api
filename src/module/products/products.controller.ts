import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PayloadInsert, ProductService } from './product.service';
import { Products } from 'src/schema/products.schema';

export class PaginatedProductResponse {
  status: number;
  data: Products[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedProductResponse> {
    return this.productService.findAll(Number(page), Number(limit));
  }

  @Post('/create')
  createProduct(@Body() payload: PayloadInsert) {
    console.log('🚀 ~ ProductController ~ createProduct ~ payload:', payload);
    return this.productService.create(payload);
  }
}
