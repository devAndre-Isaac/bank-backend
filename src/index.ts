import "reflect-metadata";
import routes from "./routes";

import { connection } from "./database";
import express from "express";

async function serverOn() {
  await connection();
  const app = express();

  app.use(express.json());

  app.use(routes);

  app.listen(3333, () => {
    console.log(" ⚡ Application running on port 3333");
  });
}
serverOn();
