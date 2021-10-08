import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";

import { CommunUser } from "../entity/users";

class AdminController {
  async readUser(req: Request, res: Response) {
    const repositoryUsers = getMongoRepository(CommunUser);
    const usersToRead = await repositoryUsers.findAndCount();
    return res.json({ users: usersToRead });
  }
  async readUserById(req: Request, res: Response) {
    const repositoryUsersId = getMongoRepository(CommunUser);
    const { _id } = req.params;
    const idReturn = await repositoryUsersId.findOne(_id);
    if (!idReturn) {
      return res.status(401).send({ Message: "Identification does not exist" });
    } else {
      return res.status(202).json(idReturn);
    }
  }
}

export default new AdminController();
