import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user";
import jwt from 'jsonwebtoken';

export default class AuthResource {
  register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ 
            message: 'User registered successfully',
            user,
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
  };

  login = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.name }, 'secret-key');
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
  };
}
