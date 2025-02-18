import { promises } from "dns";
import { AppDataSource } from "../database/data-source";
import User from "../entities/User";
import Role from "../entities/Role";
import { Request, Response } from "express";
import { format } from "util";

const userReponsiory = AppDataSource.getRepository(User);
const roleReponsiory = AppDataSource.getRepository(Role);
class UserService {
  static async getAllUser() {
    const data = await userReponsiory.find();
    return data;
  }
  static async createUser(req: Request, res: Response) {
    const user = new User();
    user.UserName = req.body.UserName;
    user.Password = req.body.Password;
    user.Email = req.body.Email;
    user.CreateDate = new Date();
    user.CreateDate.setMilliseconds(0);

    const role = await roleReponsiory.findOne({ where: { idRole: 1 } });
    if (role) {
      user.role = role;
    }
    return await userReponsiory.save(user);
  }
  static async loginUser(req: Request, res: Response){
    const data = await userReponsiory.findOne({ where:{
      Email: req.body.Email,
      Password: req.body.Password,
    },
    relations: ["role"],
  }) 
  return data;
  }
}
export default UserService;
