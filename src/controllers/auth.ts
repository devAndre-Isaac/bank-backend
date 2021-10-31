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
      res.status(401).send("Email incorreto");
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      res.status(401).send("Senha incorreto");
    }
    const token = jwt.sign(
      {
        email: validUser.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9",
      {
        subject: validUser.id,
        expiresIn: "1d",
      } as any
    );
    return res.json({ validUser, token });
  }
}

export default new AuthController();
