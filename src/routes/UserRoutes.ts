import { Router } from 'express';
import UsersCtrl from '../controllers/UsersCtrl';
import { UserValidator , userSchema } from '../validators/userValidator';

class UserRoutes {
    router = Router();
    userCtrl = new UsersCtrl();
    userValidator = new UserValidator();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.route('/').get(this.userCtrl.getAllUsers);
        this.router.route('/').post(this.userValidator.validateBody(userSchema), this.userCtrl.createUser);
    }

}
export default new UserRoutes().router;