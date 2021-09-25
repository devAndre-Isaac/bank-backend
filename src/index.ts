import "reflect-metadata";
import express from "express";
import "./database";

import { userCommunRouter } from "./routes/userCommun.routes";
import { transactionsRouter } from "./routes/transactions.routes";
import { sellersRouter } from "./routes/sellers.routes";
import { adminRouter } from "./routes/admin.routes";
import { depositRouter } from "./routes/deposit.routes";

const app = express();

app.use(express.json());

app.use(userCommunRouter, transactionsRouter, sellersRouter, adminRouter, depositRouter);

app.listen(3333, () => {
  console.log(" ⚡ Server started at http://localhost:3333");
});
