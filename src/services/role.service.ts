import Role from "../entities/Role";
import { AppDataSource } from "../database/data-source";

const roleReponsitory = AppDataSource.getRepository(Role);
class Roleservice {
  static async CreateRole(data: any) {
    const { NameRole } = data;
    const u1: Role = new Role();
    u1.NameRole = NameRole;
    return await roleReponsitory.save(u1);
  }

  static async getAllRoles(): Promise<Role[]> {
    const data: any = await roleReponsitory.find();
    console.log(data);
    return data;
  }

  static async DeleteRole(id: any) {
    const deleteRole = await roleReponsitory.delete(id);
    console.log(deleteRole);
    return deleteRole;
  }

  static async UpdateRole(id:any,dataa:any) {
    console.log("dataa",dataa);
    const {NameRole}= dataa;
    const obj = await roleReponsitory.findOneBy({idRole: id});
    if (!obj) {
      throw new Error("Role not found");
    }
    obj.NameRole = NameRole;
    return await roleReponsitory.save(obj);
    
  }
}

export default Roleservice;
