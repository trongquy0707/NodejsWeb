import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";
@Entity({name:"Images"})
class  Image{
    @PrimaryGeneratedColumn()
    idImage?: number;

    @Column()
    LinkImage?: string;
    
    @Column()
    ImageMain?: boolean;

    @ManyToOne(()=>Product,(product:Product)=>product.image)
    product?: Product;

}
export default Image;