import { Router } from "express";

import UserCommunController from "../controllers/userCommun";

const userCommunRouter = Router();

userCommunRouter.post("/picpay/user", UserCommunController.store );

export { userCommunRouter };
