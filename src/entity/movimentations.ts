import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
