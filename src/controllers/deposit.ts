import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";
import { HttpError } from "../validator/errors/HttpError";

class DepositController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { id } = req.params;
    const { value } = req.body;
    const idExist = await repository.findOne(id);
    if (!idExist) {
      throw new HttpError(401, "Identificador não encontrado");
    }
    if (!value) {
      throw new HttpError(401, "Necessário inserir um valor");
    }
    const valueSum = idExist.wallet + value;
    const updateWallet = { ...idExist, wallet: valueSum };
    const walletToSave = repository.create(updateWallet);
    const wallet = await repository.save(walletToSave);
    return res.status(201).json(wallet);
  }
}

export default new DepositController();
