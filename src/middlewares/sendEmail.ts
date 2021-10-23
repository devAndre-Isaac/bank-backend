import * as nodemailer from "nodemailer";
import { getMongoRepository } from "typeorm";
import config from "../../src/validator/config";
import { CommunUser } from "../entity/users";

export const mailToSend = async (cpf_cnpj: string) => {
  const repository = getMongoRepository(CommunUser);
  const verifyMail = repository.findOne({
    where: { cpf_cnpj },
  });

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
    const mailSent = await transporter.sendMail({
      from: "devandreisaac@gmail.com",
      to: mailTo,
      subject: "Você Recebeu uma Transferência",
      html: "Teste de envio de e-mail by: Tidé (the GOD of Programming)",
    });
    console.log(mailSent);
  }

  run();
};
