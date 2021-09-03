import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { CommunUser } from "../entity/communUser";
import UserCommunController from "../controllers/userCommun";

const userCommunRouter = Router();

userCommunRouter.post("/picpay/user", UserCommunController.store );

export { userCommunRouter };
