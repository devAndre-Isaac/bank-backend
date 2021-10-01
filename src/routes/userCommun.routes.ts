import { Router } from "express";
import { userValidator } from "../validator/validation";

import UserCommunController from "../controllers/userCommun";

const userCommunRouter = Router();

userCommunRouter.post(
  "/picpay/user",
  userValidator,
  UserCommunController.store
);
userCommunRouter.put("/picpay/user/update/:id", UserCommunController.update)

export { userCommunRouter };
