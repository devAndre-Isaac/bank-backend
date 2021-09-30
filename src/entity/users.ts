import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";

import bcrypt from "bcryptjs";
@Entity("communUser")
export class CommunUser {
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

  @Column()
  isSeller: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
