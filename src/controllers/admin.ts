import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Sellers } from "../entity/sellers";

class AdminController {
  async readSeller(req: Request, res: Response) {
    const repositorySellers = getRepository(Sellers);
    const sellerToRead = await repositorySellers.findAndCount();
    return res.json({ sellers: sellerToRead });
  }
}


export default new AdminController()
