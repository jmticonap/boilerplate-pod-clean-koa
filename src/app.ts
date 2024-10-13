import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { httpRouterMiddleware } from './infrastructure/middlewares/router.middleware';
import { routes } from './application/routes';

const app = new koa();

app.use(bodyParser()).use(httpRouterMiddleware(routes));
app.listen(3030);
