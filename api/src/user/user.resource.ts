import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user";

export default class UserResource {
  public getUsers = async (req: Request, res: Response) => {
    const { limit = 5, from = 5} = req.query;
    const query = { status : true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ]);

    res.json({ total, users, });
  };

  public getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        res.status(404).json({
            msg: `The user with Id:${id} does not exist`
        });
    }

    res.json({ user });
  };

  public createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
 
    await user.save();

    res.json({ user });
  };

  public updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({ user });
  };

  public deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, { status: true });

    if (!user) {
        res.status(404).json({
            msg: `The user ${id} does not exist`
        });
    }

    const authenticatedUser = req.body.user;

    res.json({
        user,
        authenticatedUser,
    });
  };
}
