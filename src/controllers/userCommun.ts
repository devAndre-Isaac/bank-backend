import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";

class UserCommunController {
  async store(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { email, cpf } = req.body;
    const userExists = await repository.findOne({ where: { email, cpf } });
    if (userExists) {
      return res.send("Já registrado no App");
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
      return res.status(401).send("Identification does not exist");
    }
    const userToUpdate = await repository.update(id, req.body);
    const userUpdated =  repository.create(userToUpdate as any);

    return res.status(200).json(userUpdated);
  }
  async remove(req: Request, res: Response){
    const repository = getMongoRepository(CommunUser)
    const { id } = req.params
    const idExists = await repository.findOne(id);
    if (!idExists) {
      return res.status(401).send("Identification does not exist");
    }
    const userToRemove = await repository.delete(id) as any;
    const userRemove =  repository.create(userToRemove as any);

    return res.status(200).json(userRemove);
  }
}

export default new UserCommunController();
