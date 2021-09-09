import { Router } from "express";

import TransactionsController from "../controllers/transactions";

const transactionsRouter = Router();

transactionsRouter.post("/picpay/transactions", TransactionsController.store);

export { transactionsRouter };