import "reflect-metadata";
import express from "express";
import cors from "cors";
import "./database";

import { userCommunRouter } from "./routes/userCommun.routes";
import { transactionsRouter } from "./routes/transactions.routes";
import { adminRouter } from "./routes/admin.routes";
import { depositRouter } from "./routes/deposit.routes";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  userCommunRouter,
  transactionsRouter,
  adminRouter,
  depositRouter,
  authRouter
);

app.get("/", (request, response) => {
  return response.json({ message: "PayPic - Versão 0.1" });
});

app.listen(3333, () => {
  console.log(" ⚡ Server started at http://localhost:3333");
});
