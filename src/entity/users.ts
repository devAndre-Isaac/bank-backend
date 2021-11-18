import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";

@Entity("communUser")
export class CommunUser {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  complete_name: string;

  @Column({ nullable: false })
  cpf_cnpj: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 0 })
  wallet: number = 0;

  @Column({ nullable: false })
  isSeller: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
