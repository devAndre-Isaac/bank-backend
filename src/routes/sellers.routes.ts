import { Router } from "express";

import SellersController from "../controllers/sellers";

const sellersRouter = Router();

sellersRouter.post("/picpay/sellers", SellersController.store );

export { sellersRouter };
