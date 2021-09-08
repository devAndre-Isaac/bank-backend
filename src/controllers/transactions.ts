import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Transactions } from "../entity/transactions";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getRepository(Transactions);
    const transactionsToSave = repository.create(req.body);
    const transactions = await repository.save(transactionsToSave);
    return res.status(201).json(transactions);
  }
}

export default new TransactionsController();