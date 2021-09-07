import { Router } from "express";
import AdminController from "../controllers/admin";

const adminRouter = Router();

adminRouter.get("/picpay/admin/seller", AdminController.readSeller)
adminRouter.get("/picpay/admin/user", AdminController.readUser)