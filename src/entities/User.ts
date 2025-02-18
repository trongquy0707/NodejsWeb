import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";
import Bill from "./Bill";

@Entity({name:"Users"})

class User {
    @PrimaryGeneratedColumn()
    idUser?: number;

    @Column()
    UserName?: string;

    @Column()
    Email?: string;
    
    @Column()
    Password?: string;

    @Column({nullable:true})
    id_Google?: number;

    @Column({nullable:true})
    Provider?: string;

    @Column()
    CreateDate?: Date;

    @ManyToOne(()=>(Role),(role:Role)=>role.user)
    role?: Role;

    @OneToMany(()=>(Bill),(bill:Bill)=>bill.user)
    bill?: Bill[];
}

export default User;