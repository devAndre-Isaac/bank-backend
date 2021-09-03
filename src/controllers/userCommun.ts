import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CommunUser } from "../entity/communUser";

class UserCommunController {
  async store(req: Request, res: Response) {
    const repository = getRepository(CommunUser);
    const userToSave = repository.create(req.body);
    const user = await repository.save(userToSave);
    return res.status(201).json(user);
  }
}

export default new UserCommunController();
