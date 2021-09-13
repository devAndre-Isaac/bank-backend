import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";

import bcrypt from "bcryptjs";
@Entity("communUser")
export class CommunUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
