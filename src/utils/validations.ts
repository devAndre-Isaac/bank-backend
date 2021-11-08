import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  complete_name: yup.string().strict(true).required(),
  cpf_cnpj: yup.string().strict(true).required(),
  email: yup.string().strict(true).required(),
  password: yup.string().strict(true).required(),
  wallet: yup.number().strict(true).required(),
  isSeller: yup.boolean().strict(true).required(),
});

export const sendTransactionSchema = yup.object().shape({
  cpf_cnpj: yup.string().strict(true).required(),
  value: yup.number().strict(true).required(),
  description: yup.string().strict(true),
});

export const sendDepositSchema = yup.object().shape({
  value: yup.number().strict(true).required(),
});

export const auth = yup.object().shape({
  email: yup.string().strict(true).required(),
  password: yup.string().strict(true).required(),
});

export const updateUserPassSchema = yup.object().shape({
  email: yup.string().strict(true),
  password: yup.string().strict(true).required(),
});
