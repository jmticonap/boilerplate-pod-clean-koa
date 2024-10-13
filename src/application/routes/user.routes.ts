import { container } from 'tsyringe';
import { RouteType } from '../../infrastructure/router-manager';
import UserController from '../controller/user.controller';

const userController = container.resolve(UserController);

export const userRoutes: Array<RouteType> = [
    {
        method: 'POST',
        path: '/user',
        handler: userController.register.bind(userController),
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: userController.login.bind(userController),
    },
];
