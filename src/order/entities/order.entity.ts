import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";
import { orderStatusJsonList } from "src/utils";
let statusList = Object.keys(orderStatusJsonList);

@Table
export class Order extends Model{
    @Column({ type: DataType.STRING })
    productName:string ;



    @Column({ type: DataType.INTEGER})
    price: number


    @Column({ type: DataType.INTEGER})
     get status():any{
      {
        if (this.getDataValue('status') != null) {
         return {
              id: this.getDataValue('status'),
              value: this.getDataValue('status')  == 0 ||this.getDataValue('status') > statusList.length ? "UNKNOWN_STATUS" : statusList[this.getDataValue('status') - 1]
          }
      }else return null
      }
    }

    set status(value: any) {
      this.setDataValue('status', value);
    }


    @Column({ type: DataType.INTEGER})
    quantity: number 


    @Column({ type: DataType.INTEGER})
     tax:number

     
    @Column({ type: DataType.DATE})
    date:Date

    
    @Column({ type: DataType.INTEGER})
    productId: number

    @Column({ type: DataType.INTEGER})
    deliveryCharge: number
    
    @Column({ type: DataType.INTEGER})
    get totalAmount(): any {
        {
            if (this.getItemTotal != null) {
             return {
                  value: this.getItemTotal(),
                  
              }
          }else return null
          }
    }

    @ForeignKey(() =>User)
    @Column({ type: DataType.INTEGER})
    userId:number

    getItemTotal(): number {
        return  ((this.quantity *  this.price)+this.deliveryCharge);
      }
}
