import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("transactions")
export class Transactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @Column()
  type: string;
  
}
