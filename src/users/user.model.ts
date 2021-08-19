import { DataTypes } from 'sequelize';
import { BaseUser,User,Users,UserInstance } from "./user.interface";
import {sequelize} from "../helpers/databaseConnections";

export const UserModel = sequelize.define<UserInstance>("users", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    }
},{tableName: "users",timestamps: false});