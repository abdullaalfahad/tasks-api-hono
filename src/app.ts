import configureOpenApi from "./lib/configure-open-api.js";
import createApp from "./lib/create-app.js";
import router from "./routes/index.route.js";

const app = createApp();

configureOpenApi(app);

const routes = [
  router,
];

routes.forEach((route) => {
  return app.route("/", route);
});

export default app;
