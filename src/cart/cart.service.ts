import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { CartProduct } from './entities/cartProduct';
import sequelize, { col, FindAttributeOptions, FindOptions, Model, ProjectionAlias, QueryTypes } from 'sequelize';
import { CreateCheckoutDto } from 'src/checkout/dto/create-checkout.dto';
import { Order } from 'src/order/entities/order.entity';
@Injectable()
export class CartService {
 async create( productId:number , userId:number) {

  let user = await User.findByPk(userId)

  if(!user) return "no user found"

  let cart = await Cart.findOne({
    where:{
      UserId: user.id,
    }
  })

  let product = await Product.findByPk(productId)

  if(cart){

    if(product.Quantity == 0) return "out of stock"


    let cartItem = cart.ItemTotal

    let netTotal = cartItem+product.Price

    await Cart.update({
      ItemTotal:product.Price,
      NetTotal:netTotal
    },{
      where:{
        id:cart.id
      }
    })

    let cartProduct = await CartProduct.create({
      ProductId:product.id,
      ProductName:product.Name,
      Quantity:product.Quantity,
      Price:product.Price,
      CartId:cart.id,
      UserId:user.id,
      DeliveryCharge:100
    })

    return cartProduct
  
  }else{

    let cart =  await Cart.create({
      UserId:user.id,
      ItemTotal:0,
      NetTotal:0,
     
    })

    let cartProduct = await CartProduct.create({
      ProductId:product.id,
      ProductName:product.Name,
      Quantity:product.Quantity,
      Price:product.Price,
      CartId:cart.id,
      UserId:user.id,
      DeliveryCharge:100
    })

      return cartProduct
  }




   
  }

 async findAll() {
    return Cart.findAll()
  }

 async findOne(id: number) {
    return Cart.findByPk(id)
  }

async  update(id: number, updateCartDto: UpdateCartDto) {
    return await Cart.update({
      Quantity:updateCartDto.quantity,

    },{
      where:{
        id:id
      }
    })
  }

 async remove(id: number) {


    return await CartProduct.destroy({
      where:{
        id:id
      }
    })
  }
  async deleteAll(){

    let cartprod = await CartProduct.findAll()

      let ids = cartprod.map((e) => e.id)

      return await CartProduct.destroy({
        where:{
          id:{
            [sequelize.Op.in]:ids
          }
        }
      })
  }

  async checkout(id: number,createCheckoutDto:CreateCheckoutDto, user) {

    let userId = await User.findByPk(user)

    //if(user.available_balance > 0)return "insufficent balance"

    let cartProducts: CartProduct[] = await CartProduct.findAll({
      where: {
        id: {
          [sequelize.Op.in]: createCheckoutDto.cart_products
        }
      }
    })

    let totalAmount: number = 0;



    let deliveryCharge: number;

    let ids = cartProducts.map((e) => e.id)

    const cart: Cart = await Cart.findOne({
      where: {
        UserId:user
      }
    })


    let product 
    let order
      for (let i = 0; i < cartProducts.length; i++) {

        // let paymentDetails = await this.isPayementAllowed(cartProducts[i].businessId)

        // if (!paymentDetails) return "Payment mode is not supported";

         product = await Product.findByPk(cartProducts[i].ProductId)

        //Calculate Delivery charge starts

        const currentDate = new Date();

        // Add 3 days to the current date
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 3);
    
        totalAmount = totalAmount + cartProducts[i].Price + cartProducts[i].DeliveryCharge
         order = await Order.create({
          productName: cartProducts[i].ProductName,
          price: cartProducts[i].Price,
          status: 1,
          quantity: cartProducts[i].Quantity,
  
          deliveryCharge: cartProducts[i].DeliveryCharge,
         tax:20,
          userId: userId.id,
        date: newDate,
          productId: cartProducts[i].ProductId,
         

        })

          

      }

      
        


      await CartProduct.destroy({
        where: {
          id: {
            [sequelize.Op.in]: createCheckoutDto.cart_products
          }
        }
      })

      let cartProduct = await CartProduct.findAll()
      let idss = cartProduct.map((e) =>e.id) 
      let remaining_cartProducts = await Cart.findAll({
        where:{
          id:{
            [sequelize.Op.in]:idss
          }
        }
      })

      if (remaining_cartProducts.length == 0) {

        await Cart.destroy({
          where: {
            id: cart.id
          }
        })
      }

      
      return {
        totalAmount:totalAmount,
        productName:product,
        status:order.status,
        message: "your order has been placed"
      }
 



    } 



    
   



  
}
