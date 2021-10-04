import { Router } from "express";
import AuthController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/picpay/user/auth", AuthController.authUser);

export { authRouter };
