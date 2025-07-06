import { serve } from '@hono/node-server';
import env from '../env.js';
import app from './app.js';

const port = env.PORT || 3000;

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`);
});
