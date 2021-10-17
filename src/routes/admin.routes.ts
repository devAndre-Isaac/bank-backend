import { Router, Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

import { CommunUser } from "../entity/users";
import AdminController from "../controllers/admin";

const adminRouter = Router();

adminRouter.get("/picpay/admin/user", AdminController.readUser);
adminRouter.get(
  "/picpay/admin/user/report",
  async (request: Request, response: Response) => {
    const repositoryUsers = getMongoRepository(CommunUser);
    const usersToRead = await repositoryUsers.find();

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const printer = new PDFPrinter(fonts);

    const body = [];

    for await (let usersToReads of usersToRead as any) {
      const rows = new Array();
      rows.push(usersToReads._id);
      rows.push(usersToReads.complete_name);
      rows.push(usersToReads.cpf_cnpj);
      rows.push(usersToReads.email);

      body.push(rows);
    }

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          table: {
            body: [["_id", "complete_name", "cpf_cnpj", "email", ...body]],
          },
        },
      ],
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    const chunks: any = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      response.end(result);
    });
  }
);
adminRouter.get("/picpay/admin/user/:id", AdminController.readUserById);

export { adminRouter };
