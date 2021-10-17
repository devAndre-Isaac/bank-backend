import { Router } from "express";
import AdminController from "../controllers/admin";

const adminRouter = Router();

adminRouter.get("/picpay/admin/user", AdminController.readUser);
adminRouter.get("/picpay/admin/user/report", AdminController.pdfUserGenerate);
adminRouter.get("/picpay/admin/user/:id", AdminController.readUserById);

export { adminRouter };
