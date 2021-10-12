import { Router, Request, Response } from "express";
import AdminController from "../controllers/admin";
import PDFPrinter from "pdfmake";

const adminRouter = Router();

adminRouter.get("/picpay/admin/user", AdminController.readUser);
adminRouter.get(
  "/picpay/admin/user/report",
  (request: Request, response: Response) => {
    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const printer = new PDFPrinter(fonts);
  }
);
adminRouter.get("/picpay/admin/user/:id", AdminController.readUserById);

export { adminRouter };
