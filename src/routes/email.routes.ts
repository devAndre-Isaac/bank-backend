import { Request, Response, Router } from "express";

import Mail from "../middlewares/sendEmail";

const emailRouter = Router();

emailRouter.post("/picpay/mail", async (req: Request, res: Response) => {
  const message = Object.assign({}, req.body);

  Mail.to =  message.to;
  Mail.subject =  message.subject;
  Mail.message =  message.message;
  let result = await Mail.sendMail();
  res.status(200).json({'result': result});
});

export { emailRouter };
