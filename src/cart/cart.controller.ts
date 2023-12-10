import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCheckoutDto } from 'src/checkout/dto/create-checkout.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';
import * as jwt from 'jsonwebtoken'
import e from 'express';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiSecurity('x-access-token')
  @Post('add-product/:productId')
  @ApiParam({
    name: 'productId',
    
  })
  create(@Param('productId') productId:number, @Req() req) {

    let token  = req.headers['x-access-token'];

    let decodeToken 
    if(token){
       decodeToken = jwt.decode(token,{complete:true})

      req['user'] = decodeToken
    }else{
      "token verification failed"
    }

    let userId = decodeToken.payload.id

    return this.cartService.create(productId, userId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiSecurity('x-access-token')
  @Delete('cart-product/:id')
  remove(@Param('id') id: string,@Request() req) {
    
    let token  = req.headers['x-access-token'];

    let decodeToken 
    if(token){
       decodeToken = jwt.decode(token,{complete:true})

      req['user'] = decodeToken
    }else{
      "token verification failed"
    }

    let userId = decodeToken.payload.id
    return this.cartService.remove(+id);
  }

  @ApiSecurity('x-access-token')
  @Delete('cart-products')
  deleteAll(@Request() req) {
    
    let token  = req.headers['x-access-token'];

    let decodeToken 
    if(token){
       decodeToken = jwt.decode(token,{complete:true})

      req['user'] = decodeToken
    }else{
      "token verification failed"
    }

    let userId = decodeToken.payload.id
    return this.cartService.deleteAll();
  }

  @ApiSecurity('x-access-token')
  @Post(':id/checkout')
  @UseGuards(JwtAuthGuard)
 
  checkout( @Param('id') id:string, @Body()createCheckoutDto:CreateCheckoutDto,@Request() req){
    
    let token  = req.headers['x-access-token'];

    let decodeToken 
    if(token){
       decodeToken = jwt.decode(token,{complete:true})

      req['user'] = decodeToken
    }else{
      "token verification failed"
    }

    let userId = decodeToken.payload.id
    
    return this.cartService.checkout(+id, createCheckoutDto, userId)
}
}