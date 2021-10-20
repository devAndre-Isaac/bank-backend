import { getMongoRepository } from "typeorm";
import { Transactions } from "../entity/transactions";
import { CommunUser } from "../entity/users";

export const TransactionToReport = async (
  id: string,
  cpf_cnpj: string,
  value: number
) => {
  const repositorySave = getMongoRepository(Transactions);
  const verifyRepositoryUser = getMongoRepository(CommunUser);

  const verifyIdentification = await verifyRepositoryUser.findOne(id);

  const from_who_cpf = verifyIdentification.cpf_cnpj;

  const from_who = verifyIdentification.complete_name;

  const verifyCpf = await verifyRepositoryUser.findOne({
    where: { cpf_cnpj },
  });

  const to_who = verifyCpf.complete_name;

  const userToCreate = repositorySave.create({
    from_who_cpf,
    from_who,
    to_who,
    value,
  } as any);

  const userToSave = repositorySave.save(userToCreate);
};
