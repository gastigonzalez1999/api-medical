import { Request, response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import UserResource from './user.resource';

export default class UserController {
    private userResource: UserResource;
    constructor() {
        this.userResource = new UserResource();
    }

    public getUsers = async (req: Request, res = response) => {
        return this.userResource.getUsers(req, res);
    }

    public getUser = async (req: Request, res = response) => {
        return this.userResource.getUser(req, res);
    }

    public createUser = async (req: Request, res = response) => {
        return this.userResource.createUser(req, res);     
    }

    public updateUser = async (req: Request, res = response) => {
        return this.userResource.updateUser(req, res);
    }

    public deleteUser = async (req: Request, res = response) => {
        return this.userResource.deleteUser(req, res);
    }
}
