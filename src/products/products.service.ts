import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(input: { title: string; desc: string; price: number }): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(
      prodId,
      input.title,
      input.desc,
      input.price,
    );
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      throw new NotFoundException();
    }
    return { ...product };
  }

  updatedProduct(
    productId: string,
    allInfo: { title: string; desc: string; price: number },
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedproduct = {
      ...product, ///i don't think this would work
      title: allInfo.title || product.title,
      desc: allInfo.desc || product.desc,
      price: allInfo.price || product.price,
    };
    this.products[index] = updatedproduct;

    return updatedproduct;
  }

  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    this.products.splice(index, 1);
    return {
      message: 'Successful deletion',
    };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }
}
