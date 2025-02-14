import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Product from "./Product";


@Entity({name:"Categories"})
class Category{
    @PrimaryGeneratedColumn()
    idCategory?: number;

    @Column()
    NameCategory?: string;

    @Column()
    ImageCategory?: string;

    @OneToMany(()=> Product, (product: Product)=> product.category)
    product?: Product[];
}
export default Category;