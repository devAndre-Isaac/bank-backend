import { Router } from "express";
import AdminController from "../controllers/admin";

const adminRouter = Router();

adminRouter.get("/picpay/admin", AdminController.readSeller)