import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Image from "./Image";
import Category from "./Category";
import Bill from "./Bill";
@Entity({name:"products"})
class Product{
 @PrimaryGeneratedColumn()
 idProduct?: number;

 @Column({type:"nvarchar", length: 250})
 Nameproduct?:string;

 @Column({type:"varchar", length: 1000})
 ImageName?:string;
 
 @Column({type:"float"})
 PriceOriginal?:number;

 @Column({type:"float"})
 PriceSale?:number;

 @Column({type:"text"})
 Describe?:string;

 @Column({type:"float"})
 PercentSale?:number;

 @Column({type:"boolean"})
 IsHome?:number;

 @Column({type:"boolean"})
 IsSale?:number;

// moi quan hệ với image
 @OneToMany(()=>Image, (image:Image) => image.product)
 image?:Image[];
// moi quan he voi category 
 @ManyToOne(()=>Category,(category)=>category.product)
 category?: Category;

 @ManyToOne(()=>Bill,(bill:Bill)=>bill.product)
 bill?: Bill;
}
export default Product;