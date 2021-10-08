import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";

class UserCommunController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { email, cpf } = req.body;
    const userExists = await repository.findOne({ where: { email, cpf } });
    if (userExists) {
      return res.send("Already registered in the system");
    }
    const userToSave = repository.create(req.body);
    const user = await repository.save(userToSave);
    return res.status(201).json(user);
  }
  async update(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { id } = req.params;
    const idExists = await repository.findOne(id);
    if (!idExists) {
      return res.status(401).send({ Message: "Identification does not exist" });
    }
    const userToUpdate = await repository.update(id, req.body);
    const userUpdated =  repository.create(userToUpdate as any);

    return res.status(200).json(userUpdated);
  }
}

export default new UserCommunController();
