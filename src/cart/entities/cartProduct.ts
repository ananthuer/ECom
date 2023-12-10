import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Cart } from "./cart.entity";

@Table
export class CartProduct extends Model{

    @Column({ type: DataType.INTEGER })
    ProductId : number;

    @Column({ type: DataType.INTEGER })
    UserId : number;

    @ForeignKey(()=> Cart)
    @Column({ type: DataType.INTEGER })
    CartId : number;

    @Column({ type: DataType.STRING })
    ProductName : string;

    @Column({ type: DataType.INTEGER })
    Price: number;

    @Column({ type: DataType.INTEGER })
    Quantity: number;

    
    @Column({ type: DataType.INTEGER})
    DeliveryCharge: number 

     
    selling_price() :  number{
     
        return this.Price + this.DeliveryCharge
        
      }

    getItemTotal():number {
        return this.Quantity * this.selling_price();
      }
}
