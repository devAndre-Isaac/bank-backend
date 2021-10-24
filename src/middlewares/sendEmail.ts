import * as nodemailer from "nodemailer";
import { getMongoRepository } from "typeorm";

import config from "../../src/validator/config";
import { CommunUser } from "../entity/users";

export const mailToSend = async (
  cpf_cnpj: string,
  value: number,
  id: string
) => {
  const repository = getMongoRepository(CommunUser);
  const verifyMail = repository.findOne({
    where: { cpf_cnpj },
  });

  const verifyName = repository.findOne(id);
  const selectName = (await verifyName).complete_name;
  const nameEmail = (await verifyMail).complete_name;
  const mailTo = (await verifyMail).email;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    logger: true,
    tls: { rejectUnauthorized: false },
  });

  async function run() {
    await transporter.sendMail({
      from: "devandreisaac@gmail.com",
      to: mailTo,
      subject: "Você Recebeu uma Transferência",
      html: `<h1>Olá ${nameEmail},</h1>
       <h3>Você recebeu uma transferência de ${selectName} no valor de: R$${value}</h3>`,
    });
  }

  run();
};
