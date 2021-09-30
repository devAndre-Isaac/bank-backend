import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);

    const { sendId } = req.body;
    const { id } = req.params;

    const identificationAccount = await repository.findOne(sendId);

    const verify = identificationAccount?.isSeller
     if(verify === true){
       return res.sendStatus(401)
     }

    if(!identificationAccount){
      return res.send({ Message: "Identification does not exist" });
    }
    const walletBy = identificationAccount?.wallet as any;

    const walletIdentification = await repository.findOne(id);

    if(!walletIdentification){
      return res.send({ Message: "Identification does not exist" });
    }

    const wallet = walletIdentification?.wallet;

    const { value } = req.body;

    if (walletBy < value) {
      res.send({ Message: "Insufficient funds" });
    }
    const subValue = walletBy - value;
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
