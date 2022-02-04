import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import UsersRepo from '../repositories/UsersRepo';
import { StatusCodes } from 'http-status-codes';

export default class UsersCtrl {

    constructor() {  }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
           const users = await UsersRepo.findAllUsers();
           res.status(StatusCodes.ACCEPTED).json(users);
        }
        catch (error) {
            apiErrorHandler(error, req, res, 'Fetch All Users failed.');
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req['value']['body']);
            const result = await UsersRepo.createUser(req['value']['body']);

            res.status(StatusCodes.CREATED).json(result);
        }
        catch (error) {
            apiErrorHandler(error, req, res, 'Creation of User failed.');
        }
    }
}