import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

 async findAll(page:number, limit:number, userId) {

  
  let offset = (page - 1) * limit;

  let query: any = {
    limit,
    offset,

    where:{
      userId: userId
    }
   
  }
    return await Order.findAll(query)
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
