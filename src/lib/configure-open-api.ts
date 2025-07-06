import type { AppOpenAPI } from "./types.js";

import packageJSON from "../../package.json" with { type: "json" };

export default function configureOpenApi(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "My API",
    },
  });
}
