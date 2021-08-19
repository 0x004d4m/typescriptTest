// src/users/user.interface.ts
import { Model, Optional  } from 'sequelize';
export interface BaseUser {
    username: string;
    password: string;
    role?: string;
}

export interface User extends BaseUser{
    id: number;
}

export interface Users {
    [key: number]: User;
}

export interface UserCreationAttributes extends Optional<User, "id"> {}

export interface UserInstance extends Model<User, UserCreationAttributes>,User {}