// src/users/user.service.ts
import { where } from "sequelize/types";
import { BaseUser,User,Users } from "./user.interface";
import { UserModel } from "./user.model";
import * as crypto from 'crypto';

export const findAll = async (): Promise<User[]> => {
    const instance = await UserModel.findAll();
    return instance;
};

export const find = async (id: number): Promise<User> => {
    const instance = await UserModel.findByPk(id, {
        rejectOnEmpty: true,
    });
    return instance;
};

export const create = async (newUser: BaseUser): Promise<any> => {
    var contents = crypto.createHash('md5').update(newUser.password).digest("hex")
    const createdUser = await UserModel.create({
        username: newUser.username,
        password: contents,
        role: "user",
    });
    return {"newId":createdUser.id}
};
export const update = async (id: number,itemUpdate: BaseUser): Promise<any> => {
    itemUpdate.password = crypto.createHash('md5').update(itemUpdate.password).digest("hex")
    const foundItem = await UserModel.findOne({ where: {id: id} });
    if (!foundItem) {
        return  {"updated": false,"Message":"No user Found"};
    }
    const item = await UserModel.update(itemUpdate, { where: {id: id} });
    return  {"updated": true,"Message":"User Updated Successfully"};
};





export const remove = async (id: number): Promise<any> => {
    const foundItem = await UserModel.findOne({ where: {id: id} });
    if(foundItem?.role=="admin"){
        return {"deleted":false}
    }else{
        UserModel.destroy({where: {id: id}})
        return {"deleted":true}
    }
};