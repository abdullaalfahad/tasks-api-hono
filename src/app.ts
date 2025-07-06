import type { PinoLogger } from 'hono-pino';
import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError } from 'stoker/middlewares';
import { honoPinoLogger } from './middlewares/hono-pino-logger.js';

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

const app = new OpenAPIHono<AppBindings>();
app.use(honoPinoLogger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  c.var.logger.info('hi');
  c.status(422);
  throw new Error('Error');
});

app.notFound(notFound);
app.onError(onError);

export default app;
