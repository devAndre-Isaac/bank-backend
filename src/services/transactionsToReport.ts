import { getMongoRepository } from "typeorm";
import { Movimentations } from "../entity/movimentations";
import { CommunUser } from "../entity/users";

export const TransactionToReport = async (
  id: string,
  cpf_cnpj: string,
  value: number,
  description: string
) => {
  const repositorySave = getMongoRepository(Movimentations);
  const verifyRepositoryUser = getMongoRepository(CommunUser);

  const verifyIdentification = await verifyRepositoryUser.findOne(id);

  const from_who_cpf = verifyIdentification.cpf_cnpj;

  const from_who = verifyIdentification.complete_name;

  const verifyCpf = await verifyRepositoryUser.findOne({
    where: { cpf_cnpj },
  });

  const to_who = verifyCpf.complete_name;
  const to_who_cpf = verifyCpf.cpf_cnpj;

  const userToCreate = repositorySave.create({
    from_who_cpf,
    from_who,
    to_who,
    to_who_cpf,
    value,
    description,
    type: "transaction",
  } as any);

  repositorySave.save(userToCreate);
};
