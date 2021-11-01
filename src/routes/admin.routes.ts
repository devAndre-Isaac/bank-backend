import { Router } from "express";
import AdminController from "../controllers/admin";
import auth from '../middlewares/auth'

const adminRouter = Router();

adminRouter.get("/picpay/admin/user", AdminController.readUser);
adminRouter.get("/picpay/admin/user/report", AdminController.pdfUserGenerate);
adminRouter.get("/picpay/admin/user/:id", auth, AdminController.readUserById);

export { adminRouter };
