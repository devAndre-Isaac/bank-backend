import { body } from "express-validator";

export const userValidator = [
  body("complete_name")
    .isLength({ max: 50 })
    .not()
    .notEmpty()
    .withMessage("O campo nome é obrigatório."),
  body("cpf_cnpj").isLength({ max: 50 }).not(),
  body("email").isEmail(),
  body("password")
    .isLength({ max: 50 })
    .not()
    .notEmpty()
    .withMessage("O campo senha é obrigatório."),
];
