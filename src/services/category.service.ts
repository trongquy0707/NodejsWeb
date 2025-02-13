import { AppDataSource } from "../database/data-source";
import Category from "../entities/Category";
import { Request, Response } from "express";
const CategoryRepository = AppDataSource.getRepository(Category);
class CategoryService {
  static async createCategory(req: Request, res: Response) {
    const cate1 = new Category();
    cate1.NameCategory = req.body.NameCategory;
    cate1.ImageCategory = req.file?.originalname;
    return await CategoryRepository.save(cate1);
  }

  static async getAllCategory(req: Request, res: Response) {
    const categories = await CategoryRepository.find();
    return categories;
  }

  static async deleteCategory(id:any){
    const category = await CategoryRepository.findOneBy({idCategory:id});
    console.log("Service",category);
    if(!category){
      throw new Error("Category not found");
    }
   await CategoryRepository.remove(category);
  }
}

export default CategoryService;
