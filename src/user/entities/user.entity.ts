import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table
export class User extends Model{

    @Column({ type: DataType.STRING })
    Name: string;

    @Column({ type: DataType.STRING })
    Email: string;

    @Column({ type: DataType.STRING })
    Address: string;

    @Column({ type: DataType.STRING })
    Password: string;

    @Column({ type: DataType.INTEGER })
    Role: number;

}
