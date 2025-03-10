import Role from "../../entities/Role";
import Roleservice from "../../services/role.service";
import { Request, Response } from "express";
class RoleController {
  static async createRole(req: Request, res: Response) {
    try {
      const role = await Roleservice.CreateRole(req.body);
      const data = {
        message: "Role created successfully",
        data: role,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "error creating role",
      };
      res.json(data);
    }
  }

  static async getAllRoles(req: Request, res: Response) {
    try {
      const allrole = await Roleservice.getAllRoles();
      const data = {
        message: "Đay la roler nhenhe",
        data: allrole,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "khong thanh cong",
      };
      res.json(data);
    }
  }

  static async deleteRole(id: any, req: Request, res: Response) {
    try {
      const deletes = await Roleservice.DeleteRole(id);
      const data = {
        message: "xoa thanh cong",
        data: deletes,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "khong thanh cong",
      };
      res.json(data);
    }
  }
  static async updateRole( req: Request, res: Response) {
    try {
      console.log("id_role_cotroller", req.params.id);
      const id_role = req.params.id;
      const dataa = req.body;
      console.log("role_cotrollersss", req.body)
      const role = await Roleservice.UpdateRole(id_role,dataa);
      const data = {
        message: "Role updated successfully",
        data: role,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "error updating role",
      };
      res.json(data);
    }
  }
}
export default RoleController;
