import { Router } from "express";

import SellersController from "../controllers/sellers";
import { userValidator } from "../validator/validation";

const sellersRouter = Router();

sellersRouter.post("/picpay/sellers", userValidator, SellersController.store);

export { sellersRouter };
