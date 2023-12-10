import { Column, DataType, Model, Table } from "sequelize-typescript";

export class Checkout {
    @Column({ type: DataType.INTEGER })
    cartId: number;

    @Column({ type: DataType.INTEGER })
    status: number;

    @Column({ type: DataType.INTEGER })
    userId: number

    @Column({ type: DataType.INTEGER })
    netTotal: number

    @Column({ type: DataType.INTEGER })
    deliveryCharge: number

    @Column({ type: DataType.INTEGER })
    cod_products : number


}
