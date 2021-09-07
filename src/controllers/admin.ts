import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CommunUser } from "../entity/communUser";
import { Sellers } from "../entity/sellers";

class AdminController {
  async readSeller(req: Request, res: Response) {
    const repositorySellers = getRepository(Sellers);
    const sellerToRead = await repositorySellers.findAndCount();
    return res.json({ sellers: sellerToRead });
  }
  async readUser(req: Request, res: Response) {
    const repositoryUsers = getRepository(CommunUser);
    const usersToRead = await repositoryUsers.findAndCount();
    return res.json({ users: usersToRead });
  }
}

export default new AdminController();
