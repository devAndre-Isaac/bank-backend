import { getMongoRepository } from "typeorm";
import { Movimentations } from "../entity/movimentations";
import { CommunUser } from "../entity/users";

export const DepositToReport = async (id: string, value: number) => {
  const repositorySave = getMongoRepository(Movimentations);
  const verifyRepositoryUser = getMongoRepository(CommunUser);

  const verifyIdentification = await verifyRepositoryUser.findOne(id);

  const from_who_cpf = verifyIdentification.cpf_cnpj;

  const from_who = verifyIdentification.complete_name;

  const userToCreate = repositorySave.create({
    from_who_cpf,
    from_who,
    value,
    type: "deposit",
  } as any);

  repositorySave.save(userToCreate);
};
