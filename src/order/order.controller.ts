import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken'
@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiSecurity('x-access-token')
  @Get('order-history')
  @ApiQuery({
    name:"limit",
    required:false
  })
  @ApiQuery({
    name:"page",
    required:false
  })
  findAll(@Query('limit',new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number, @Req() req: any) {

    let token  = req.headers['x-access-token'];

    let decodeToken 
    if(token){
       decodeToken = jwt.decode(token,{complete:true})

      req['user'] = decodeToken
    }else{
      "token verification failed"
    }

    let userId = decodeToken.payload.id
    return this.orderService.findAll(page, limit, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
