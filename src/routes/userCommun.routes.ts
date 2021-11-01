import { Router } from "express";

import UserCommunController from "../controllers/userCommun";

const userCommunRouter = Router();

userCommunRouter.post(
  "/picpay/user",
  UserCommunController.store
);
userCommunRouter.put(
  "/picpay/user/update/all/:id",
  UserCommunController.update
);
userCommunRouter.put(
  "/picpay/user/update/pass/:id",
  UserCommunController.passUpdate
);
userCommunRouter.delete("/picpay/user/remove/:id", UserCommunController.remove);

export { userCommunRouter };
