import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  addProducts(
    @Body()
    completeBody: {
      title: string;
      desc: string;
      price: number;
    },
  ) {
    const generatedId = this.ProductsService.insertProduct(completeBody);
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.ProductsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.ProductsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body() allFields: { title: 'string'; desc: string; price: number },
  ) {
    let update = this.ProductsService.updatedProduct(prodId, allFields);
    return { update };
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    let deleteProd = this.ProductsService.deleteProduct(prodId);
    return deleteProd;
  }
}
