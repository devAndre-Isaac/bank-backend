import { Router } from "express";

import TransactionsController from "../controllers/transactions";

const transactionsRouter = Router();

transactionsRouter.post(
  "/picpay/transactions/:id",
  TransactionsController.store
);
transactionsRouter.get(
  "/picpay/transactions/log/send/:from_who_cpf",
  TransactionsController.viewMovimentationOfSendTransaction
);

transactionsRouter.get(
  "/picpay/transactions/log/receive/:to_who_cpf",
  TransactionsController.viewMovimentationOfReceiveTransaction
);

transactionsRouter.get(
  "/picpay/transactions/view/:id",
  TransactionsController.viewTransactionById
);

export { transactionsRouter };
