import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/communUser";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);

    const { sendId } = req.body;
    const { id } = req.params;

    const identificationAccount = await repository.findOne(sendId);

    const carteiraDele = identificationAccount?.wallet as any;

    const walletIdentification = await repository.findOne(id);

    const wallet = walletIdentification?.wallet;

    const { value } = req.body;

    if (carteiraDele < value) {
      res.send({ Message: "Insufficient funds" });
    }
    const subValue = carteiraDele - value;
    const replaceSubWallet = { ...identificationAccount, wallet: subValue };

    const sumValue = value + wallet;
    const replaceSumWallet = { ...walletIdentification, wallet: sumValue };

    const subToCreate = repository.create(replaceSubWallet);
    const subToSave = await repository.save(subToCreate);

    const sumToCreate = repository.create(replaceSumWallet);
    const sumToSave = await repository.save(sumToCreate);

    return res
      .status(201)
      .json([
        "LogEvento: ",
        { TransactionsDataOfReceive: sumToSave },
        { TransactionsDataOfSend: subToSave },
      ]);
  }
}

export default new TransactionsController();
