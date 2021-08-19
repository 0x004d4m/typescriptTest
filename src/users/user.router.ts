import express, { Request, Response } from "express";
import * as UserService from "./user.service";
import { BaseUser, User,Users } from "./user.interface";
export const userRouter = express.Router();


userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: User[] = await UserService.findAll();
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const user: User = await UserService.find(id);
        if (user) {
            return res.status(200).send(user);
        }
      res.status(404).send("item not found");
    } catch (e) {
      res.status(500).send(e.message);
    }
});
  
userRouter.post("/", async (req: Request, res: Response) => {
    try {
      const user: BaseUser = req.body;
      const newUser = await UserService.create(user);
      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).send(e.message);
    }
});
  
userRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const userUpdate: User = req.body;
        const existingUser: User = await UserService.find(id);
        if (existingUser) {
            const updatedItem = await UserService.update(id, userUpdate);
            return res.status(200).json(updatedItem);
        }
        const newItem = await UserService.create(userUpdate);
        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const newItem = await UserService.remove(id);
        console.log(newItem);
        res.status(200).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});