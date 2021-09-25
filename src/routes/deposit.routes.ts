import { Router } from "express";

import DepositController from "../controllers/deposit";

const depositRouter = Router();

depositRouter.post("/picpay/deposit/save/:id", DepositController.store);

export { depositRouter };