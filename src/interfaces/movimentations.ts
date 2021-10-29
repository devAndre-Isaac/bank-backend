export interface SendTransaction {
  cpf_cnpj: string;
  value: Number;
}

export interface Deposit {
  value: number;
}

export interface CreateUser {
  complete_name: string;
  cpf_cnpj: string;
  email: string;
  password: string;
  wallet: Number;
  isSeller: boolean;
}

export interface AuthUser {
  email: string;
  password: string;
}
