import { Sequelize } from "sequelize-typescript";
import { User } from "./user/entities/user.entity";
import { Product } from "./product/entities/product.entity";
import { Cart } from "./cart/entities/cart.entity";
import { CartProduct } from "./cart/entities/cartProduct";
import { Order } from "./order/entities/order.entity";



export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port:5432,
          username: "postgres",
          password: "1316",
          database: "Ecommerce",
          pool:{
             max: 5,
             min: 0,
             acquire: 30000,
           idle: 10000
          },
          
          
        });
        sequelize.addModels([User, Product, Cart, CartProduct, Order]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ]; 