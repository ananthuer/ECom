import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Product extends Model{

    @Column({ type: DataType.STRING })
    Name: string;

    @Column({ type: DataType.INTEGER })
    Price: number;
    
    @Column({ type: DataType.STRING })
    Description: string;

    @Column({ type: DataType.INTEGER })
    Quantity: number;

    
}
