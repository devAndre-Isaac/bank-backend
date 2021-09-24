import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  ObjectID,
} from "typeorm";

import bcrypt from "bcryptjs";

@Entity("sellers")
export class Sellers {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  complete_name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column()
  wallet: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
