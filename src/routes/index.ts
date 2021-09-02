import { Router } from "express";
import userCommunRouter from './userCommun.routes'

const routes = Router();
routes.use("/test", userCommunRouter);
export default routes;

