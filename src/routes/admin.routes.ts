import { Router } from "express";
import AdminController from "../controllers/admin";

const adminRouter = Router();

adminRouter.get("/picpay/admin/user", AdminController.readUser)
adminRouter.get("/picpay/admin/user/:_id", AdminController.readUserById)

export { adminRouter }