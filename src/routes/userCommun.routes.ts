import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { CommunUser } from "../entity/communUser";

const userCommunRouter = Router();

userCommunRouter.post("/", async (req: Request, res: Response) => {
  const repository = getRepository(CommunUser);
  const userToSave = repository.create(req.body);
  const user = await repository.save(userToSave);
  return res.status(201).json(user);
});

export { userCommunRouter };
