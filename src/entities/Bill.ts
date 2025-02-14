import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import BillDetails from "./BillDetail";
import Product from "./Product";

@Entity({ name: "Bills" })
class Bill {
  @PrimaryGeneratedColumn()
  idBill?: number;

  @Column({ type: "float" })
  TotalBill?: number;

  @Column()
  CreateDate?: Date;
  // nhieu bill cho mot useruser
  @ManyToOne(() => User, (user) => user.bill)
  user?: User;
  // một bill có nhiều bill deatil
  @ManyToOne(() => BillDetails, (billdetails: BillDetails) => billdetails.bill)
  billDetails?: BillDetails[];
  // một bill có nhiều sản phẩmphẩm
  @ManyToOne(() => Product, (product: Product) => product.bill)
  product?: Product;
}

export default Bill;
