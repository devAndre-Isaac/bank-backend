import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from "typeorm";

@Entity("transactions")
export class Transactions {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  from_who_cpf: string;

  @Column()
  from_who: string;

  @Column()
  to_who: string;

  @Column()
  value: string;

  @CreateDateColumn()
  date: Date;
}
