import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import sequelize, { col, FindAttributeOptions, FindOptions, Model, ProjectionAlias, QueryTypes } from 'sequelize';

@Injectable()
export class ProductService {
 async create(createProductDto: CreateProductDto) {
    return await Product.create({
      Name: createProductDto.name,
      Price: createProductDto.price,
      Description: createProductDto.description,
      Quantity: createProductDto.quantity
    })
  }

async findAll(limit: number, page: number, name: string) {

  let offset = (page - 1) * limit;

  let query: any = {
    limit,
    offset,

   
  }

  if (name) {
    if (!query["where"]) {
      query["where"] = {}
    }

    query["where"]["name"] = {
      [sequelize.Op.iLike]: `%${name}%`
    }
  }
  


    return await Product.findAll(query)
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
