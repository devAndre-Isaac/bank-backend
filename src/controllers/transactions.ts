import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/communUser";

class TransactionsController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { id } = req.params;
    const walletIdentification = repository.findOne({ where: { id } });
    console.log(walletIdentification);
  }
}

export default new TransactionsController();
