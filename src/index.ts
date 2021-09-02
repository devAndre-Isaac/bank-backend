import "reflect-metadata";
import express from "express";

import { connection } from "./database";
import { userCommunRouter } from "./routes/userCommun.routes";

async function serverOn() {
  await connection();

  const app = express();

  app.use(express.json());

  app.use(userCommunRouter);

  app.listen(3333, () => {
    console.log(" ⚡ Server started at http://localhost:3333");
  });
}
serverOn();
