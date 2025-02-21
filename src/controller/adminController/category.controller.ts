import { Request,Response } from "express";
import CategoryService from "../../services/Admin/category.service";
class CategoryContrller {
  static async createCategory(req: Request, res: Response) {
    try {
      console.log("Category created", req.file?.originalname);
      const category = await CategoryService.createCategory(req,res);
      const data = {
        message: "Category created successfully",
        data: category,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "error creating category",
      };
      res.json(data);
    }
  }

  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategory(req,res);
      const data = {
        message: "Categories fetched successfully",
        data: categories,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "error fetching categories",
      };
      res.json(data);
    }
  }

  static async deleteCategory(id:any, req:Request ,res:Response){
    try{
      console.log("id_category_cotroller",id)
      const deleteCategory = await CategoryService.deleteCategory(id);
      const notif = {
        message:"Category delete successfully ",
        data:deleteCategory
      }
      res.json(notif);

    }
    catch
    {
      const notif = {
        message:"Error deleting category"
      }
      res.json(notif);
    }
  }

  static async updateCategory(id:any, req:Request, res:Response) {
    try {
      const updatedCategory = await CategoryService.updateCategory(id, req);
      const data = {
        message: "Category updated successfully",
        data: updatedCategory,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "error updating category",
      };
      res.json(data);
    }
  }
}
export default CategoryContrller
