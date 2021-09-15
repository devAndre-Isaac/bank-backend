import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { CommunUser } from "../entity/communUser";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getRepository(CommunUser);
    const { wallet } = req.body;
    const walletValue = repository.findOne({ where: { wallet } });
    if (wallet > walletValue) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    const transactionsToSave = repository.create(req.body);

    const transactions = await repository.save(transactionsToSave);
    return res.status(201).json(transactions);
  }
}

export default new TransactionsController();
