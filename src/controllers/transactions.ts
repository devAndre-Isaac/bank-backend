import { Request, Response } from "express";
import { Any, getRepository } from "typeorm";
import { Transactions } from "../entity/transactions";
import { CommunUser } from "../entity/communUser";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getRepository(CommunUser);
    const { wallet } = req.body;
    const walletTem = repository.findOne({ where: { wallet } });
    if (wallet > walletTem) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    const transactionsToSave = repository.create(req.body);

    const transactions = await repository.save(transactionsToSave);
    return res.status(201).json(transactions);
  }
}

export default new TransactionsController();
