import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Sellers } from "../entity/sellers";

class SellersController {
  async store(req: Request, res: Response) {
    const repository = getRepository(Sellers);
    const { email, cpf } = req.body;
    const sellersExists = await repository.findOne({ where: { email, cpf } });
    if (sellersExists) {
      return res.send(
        "Already registered in the system"
      );
    }
    const sellersToSave = repository.create(req.body);
    const sellers = await repository.save(sellersToSave);
    return res.status(201).json(sellers);
  }
}

export default new SellersController();
