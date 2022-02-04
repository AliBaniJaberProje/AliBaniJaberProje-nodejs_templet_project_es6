import { User } from '../models/user';

class UsersRepo {

    constructor() {  }

    findAllUsers() {
        return User.findAll();
    }

    createUser(props: any) {
        return User.create(props);
    }

}
export default new UsersRepo();