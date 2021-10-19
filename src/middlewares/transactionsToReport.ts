import { getMongoRepository } from "typeorm";
import { CommunUser } from "../entity/users";

export const TransactionToReport = async (
  id: string,
  cpf_cnpj: string,
  value: number,
  data: Date
) => {
  const repositoryUser = getMongoRepository(CommunUser);
  const verifyIdentification = await repositoryUser.findOne(id);

  const nameToSave = verifyIdentification.complete_name;
  console.log(
    "🚀 ~ file: transactionsToReport.ts ~ line 14 ~ nameToSave",
    nameToSave
  );

  const verifyCpf = await repositoryUser.findOne({
    where: { cpf_cnpj },
  });
  const cpfToSave = verifyCpf.complete_name;
  console.log("🚀 ~ file: transactionsToReport.ts ~ line 23 ~ cpfToSave", cpfToSave)


  return {};
};
