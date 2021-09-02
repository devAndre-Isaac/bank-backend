import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("communUser")
export class CommunUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  complete_name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
