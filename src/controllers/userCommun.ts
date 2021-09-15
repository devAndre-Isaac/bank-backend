import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { CommunUser } from "../entity/communUser";

class UserCommunController {
  async store(req: Request, res: Response) {
    const repository = getRepository(CommunUser);
    const { email, cpf } = req.body;
    const userExists = await repository.findOne({ where: { email, cpf } });
    if (userExists) {
      return res.send(
        "Already registered in the system"
      );
    }
    const userToSave = repository.create(req.body);
    const user = await repository.save(userToSave);
    return res.status(201).json(user);
  }
}

export default new UserCommunController();
