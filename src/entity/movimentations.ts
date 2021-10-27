import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
} from "typeorm";

@Entity("movimentations")
export class Movimentations {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  from_who_cpf: string;

  @Column()
  from_who: string;

  @Column()
  to_who: string;

  @Column()
  to_who_cpf: string;

  @Column()
  value: string;

  @Column()
  type: string;

  @CreateDateColumn()
  date: Date;
}
