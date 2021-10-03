import { Router } from "express";
import AuthController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/api/user/auth", AuthController.authUser);

export { authRouter };
