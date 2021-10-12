import { Router, Request, Response } from "express";

import AdminController from "../controllers/admin";
import fs from "fs";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

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

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [{ text: "My firts relatory from code drops" }],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"));
    pdfDoc.end();
    response.send("relatorio concluido");
  }
);
adminRouter.get("/picpay/admin/user/:id", AdminController.readUserById);

export { adminRouter };
