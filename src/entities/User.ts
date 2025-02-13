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

    @Column()
    id_Google?: number;

    @Column()
    Provider?: string;

    @Column()
    CreateDate?: string;

    @ManyToOne(()=>(Role),(role:Role)=>role.user)
    role?: Role;

    @OneToMany(()=>(Bill),(bill:Bill)=>bill.user)
    bill?: Bill[];
}

export default User;