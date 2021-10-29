import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { Movimentations } from "../entity/movimentations";

import { CommunUser } from "../entity/users";
import { mailToSend } from "../middlewares/sendEmail";
import { TransactionToReport } from "../middlewares/transactionsToReport";
import { consultAuthServiceOfMail, consultAuthServiceOfTransactions } from "../utils/authApis";
import { sendTransactionSchema } from "../utils/validations";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);

    const body = await sendTransactionSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { cpf_cnpj } = body;
    const { id } = req.params;

    const identificationAccount = await repository.findOne(id);

    const verify = identificationAccount?.isSeller;
    if (verify === true) {
      return res.sendStatus(401);
    }

    if (!identificationAccount) {
      return res.status(401).send("Identificador necessário");
    }
    const walletBy = identificationAccount?.wallet as any;
    const walletIdentification = await repository.findOne({
      where: { cpf_cnpj },
    });

    const consultServiceApiOfTransaction = await consultAuthServiceOfTransactions()

    if(consultServiceApiOfTransaction.message !== 'Autorizado'){
        return res.status(401).send('Serviço autorizador de transferência fechado')
    }

    if (!walletIdentification) {
      return res.status(401).send("CPF ou CNPJ não existe");
    }

    const wallet = walletIdentification?.wallet;

    const { value } = body;

    const subVerify = walletBy < value;

    if (subVerify === true) {
      res.status(401).send("Saldo Insuficiente");
    } else {
      const subValue = (await walletBy) - value;
      const replaceSubWallet = { ...identificationAccount, wallet: subValue };

      const sumValue = wallet + value;
      const replaceSumWallet = { ...walletIdentification, wallet: sumValue };

      const subToCreate = repository.create(replaceSubWallet);
      const subToSave = await repository.save(subToCreate);

      const sumToCreate = repository.create(replaceSumWallet);
      await repository.save(sumToCreate);

      subToSave.created_at;

      // const consultService = await consultAuthServiceOfMail();

      // if (consultService.message === "Success") {
      //   mailToSend(cpf_cnpj, value, id);
      // }

      TransactionToReport(id, cpf_cnpj, value);

      return res
        .status(201)
        .json(["LogEvento: ", { TransactionsDataOfSend: subToSave }]);
    }
  }
  async viewMovimentationOfSendTransaction(req: Request, res: Response) {
    const repositoryUsersId = getMongoRepository(Movimentations);
    const { from_who_cpf } = req.params;
    const trasactionsByCpfReturn = await repositoryUsersId.find({
      from_who_cpf,
    } as any);

    if (!trasactionsByCpfReturn) {
      return res.status(401).send("Identification does not exist");
    } else {
      return res.status(202).json(trasactionsByCpfReturn);
    }
  }
  async viewMovimentationOfReceiveTransaction(req: Request, res: Response) {
    const repositoryUsersId = getMongoRepository(Movimentations);
    const { to_who_cpf } = req.params;
    const trasactionsByCpfReturn = await repositoryUsersId.find({
      to_who_cpf,
    } as any);

    if (!trasactionsByCpfReturn) {
      return res.status(401).send("Identification does not exist");
    } else {
      return res.status(202).json(trasactionsByCpfReturn);
    }
  }
  async viewTransactionById(req: Request, res: Response) {
    const repository = getMongoRepository(Movimentations);
    const { id } = req.params;
    const viewById = await repository.findOne(id);
    if (!viewById) {
      return res
        .status(401)
        .send("Identificador não existente na base de dados");
    }
    return res.status(202).json(viewById);
  }
}
export default new TransactionsController();
