import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { CommunUser } from "../entity/users";
import jwt from "jsonwebtoken";
import { auth } from "../utils/validations";

class AuthController {
  async authUser(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const body = await auth.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const { email, password } = body;
    const validUser = await repository.findOne({ where: { email } });
    if (!validUser) {
      return res.status(401).send("Email incorreto");
    }
    const validPassword =  await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).send("Senha incorreto");
    }
    const token = jwt.sign({ id: validUser.id }, "secret", {
      expiresIn: "1d",
    });
    delete validUser.password
    return res.json({ validUser, token });
  }
}

export default new AuthController();
