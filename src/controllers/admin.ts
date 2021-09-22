import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { CommunUser } from "../entity/communUser";
import { Sellers } from "../entity/sellers";

class AdminController {
  async readSeller(req: Request, res: Response) {
    const repositorySellers = getRepository(Sellers);
    const sellersToRead = await repositorySellers.findAndCount();
    return res.json({ sellers: sellersToRead });
  }
  async readUser(req: Request, res: Response) {
    const repositoryUsers = getRepository(CommunUser);
    const usersToRead = await repositoryUsers.findAndCount();
    return res.json({ users: usersToRead });
  }
  async readUserById(req: Request, res: Response) {
    const repositoryUsersId = getRepository(CommunUser);
    const { _id } = req.params;
    const idReturn = await repositoryUsersId.findOne(_id);
    if (!idReturn) {
      return res.send({ Message: "Identification does not exist" });
    } else {
      return res.json(idReturn);
    }
  }
}

export default new AdminController();
