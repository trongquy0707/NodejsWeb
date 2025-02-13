import { AppDataSource } from "../database/data-source";
import Product from "../entities/Product";

const ProductReponsitory = AppDataSource.getRepository(Product)
class ProductService{
    async createProduct(req:Request,res:Response){
        const product = new Product();
        // product.Nameproduct = req.body.NameProduct;
    }
}