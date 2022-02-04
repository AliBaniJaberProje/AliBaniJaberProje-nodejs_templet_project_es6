import sequelize from '../db/db';
import { Model , DataTypes } from 'sequelize';

export class User extends Model {
    id!: number;
    first_name!: string;
    last_name!: string;
}

User.init(
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    },
    {
    sequelize,
    tableName: 'Users'
    },
);