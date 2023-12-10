import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CartProduct } from "./cartProduct";

@Table
export class Cart extends Model{

    @Column({ type: DataType.INTEGER })
    UserId: number;

    @Column({ type: DataType.INTEGER })
    ItemTotal: number;

    @Column({ type: DataType.INTEGER })
    NetTotal: number;

    @HasMany(()=> CartProduct)
    cart:CartProduct

}
