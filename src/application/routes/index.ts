import { RouteType } from '../../infrastructure/router-manager';
import GreetingController from '../controller/greeting.controller';

const greetingController = new GreetingController();

export const routes: Array<RouteType> = [
    {
        method: 'GET',
        path: '/greeting',
        handler: greetingController.greeting,
    },
    {
        method: 'GET',
        path: '/query/{id}',
        handler: greetingController.query,
    },
];
