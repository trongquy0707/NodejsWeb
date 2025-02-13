import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Bill from "./Bill";

@Entity({ name: "BillDetails" })
class BillDetails {
  @PrimaryGeneratedColumn()
  idBillDetails?: number;
  
  @Column()
  Email?: number;

  @Column()
  NameCustommer?: string;

  @Column()
  PhoneNumber?: string;

  @Column()
  City?: string;

  @Column()
  District?: string;

  @Column()
  Villager?: string;

  @Column()
  Notes?: string;

  @Column()
  MethorPayment?: string;

  @Column()
  Code?: string;

  @Column()
  Status?: string;

  @OneToMany(()=>Bill,(bill:Bill)=> bill.billDetails )
  bill?: Bill;
}
export default BillDetails
