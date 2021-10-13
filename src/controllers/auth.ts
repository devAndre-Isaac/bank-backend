import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { CommunUser } from "../entity/users";
import jwt from "jsonwebtoken";
import { HttpError } from "../validator/errors/HttpError";

class AuthController {
  async authUser(req: Request, res: Response) {
    const repository = getMongoRepository(CommunUser);
    const { email, password } = req.body;
    const validUser = await repository.findOne({ where: { email } });
    if (!validUser) {
      throw new HttpError(401, `Email: ${validUser} incorreto`);
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      throw new HttpError(401, "Senha incorreta");
    }
    const token = jwt.sign({ id: validUser.id }, "secret", {
      expiresIn: "1d",
    });
    delete validUser.password;
    return res.json({ validUser, token });
  }
}

export default new AuthController();
