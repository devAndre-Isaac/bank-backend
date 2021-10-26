import { Router } from "express";

import TransactionsController from "../controllers/transactions";

const transactionsRouter = Router();

transactionsRouter.post(
  "/picpay/transactions/:id",
  TransactionsController.store
);
transactionsRouter.get(
  "/picpay/transactions/log/:from_who_cpf",
  TransactionsController.viewOne
);

transactionsRouter.get("/picpay/transactions/view/:id", TransactionsController.viewTransactionById)

export { transactionsRouter };
