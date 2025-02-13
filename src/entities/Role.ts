import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({name:"Roles"})

class Role{
    @PrimaryGeneratedColumn()
    idRole?: number;
    
    @Column()
    NameRole?: string;
    @OneToMany(()=>User,(user: User) => user.role)
    user?: User[];
}
export default  Role