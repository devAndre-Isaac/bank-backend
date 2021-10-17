import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

import { CommunUser } from "../entity/users";

class AdminController {
  async readUser(req: Request, res: Response) {
    const repositoryUsers = getMongoRepository(CommunUser);
    const usersToRead = await repositoryUsers.findAndCount();
    return res.json({ users: usersToRead });
  }
  async readUserById(req: Request, res: Response) {
    const repositoryUsersId = getMongoRepository(CommunUser);
    const { id } = req.params;
    const idReturn = await repositoryUsersId.findOne(id);
    if (!idReturn) {
      return res.status(401).send("Identification does not exist");
    } else {
      return res.status(202).json(idReturn);
    }
  }
  async pdfUserGenerate(req: Request, res: Response ){
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
      res.end(result);
    });
  }
}

export default new AdminController();
