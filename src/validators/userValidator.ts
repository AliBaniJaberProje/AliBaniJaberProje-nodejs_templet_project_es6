import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface UserRequest extends Request {
    value?: { body?: string };
}
export class UserValidator {
    constructor() {  }

    validateBody(schema) {
        return async (req: UserRequest, res: Response, next: NextFunction) => {
            try {
                const val = await schema.validateAsync(req.body);
                req.value = req.value ?? {};
                req.value.body = req.value.body ?? val;
                next();
            } catch (error) {
                res.status(StatusCodes.BAD_REQUEST).json(error);
            }
        };
    }
}

export const userSchema = Joi.object().keys({
    id: Joi.number().integer(),
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
});