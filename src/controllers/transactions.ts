import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";
import { TransactionToReport } from "../middlewares/transactionsToReport";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);

    const { cpf_cnpj } = req.body;
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

    if (!walletIdentification) {
      return res.status(401).send("CPF ou CNPJ não existe");
    }

    const wallet = walletIdentification?.wallet;

    const { value } = req.body;

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
      const sumToSave = await repository.save(sumToCreate);

      const data = subToSave.created_at
 
        const shareToMiddle =  TransactionToReport(id, cpf_cnpj, value, data)

      return res
        .status(201)
        .json(["LogEvento: ", { TransactionsDataOfSend: subToSave }]);
    }
  }
}
export default new TransactionsController();
