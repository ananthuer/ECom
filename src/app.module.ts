import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, CartModule, CheckoutModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
