import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Product from "../entities/Product";
import Image from "../entities/Image";
const ImageReponsitory = AppDataSource.getRepository(Image);
const ProductReponsitory = AppDataSource.getRepository(Product);

class ProductService {
  static async createProduct(req: Request, res: Response) {
    const product = new Product();
    product.Nameproduct = req.body.Nameproduct;
    const percent = Number(req.body.PercentSale) || 0;
    const priceOriginal = Number(req.body.PriceOriginal) || 0;
    const discount = (percent * priceOriginal) / 100;
    product.PriceOriginal = priceOriginal;
    product.PercentSale = req.body.PercentSale;
    product.PriceSale = req.body.PriceOriginal - discount;
    product.Describe = req.body.Describe || "Chưa có mô tả";
    product.IsHome = req.body.IsHome;
    product.IsSale = req.body.IsSale;
    product.category = req.body.categoryIdCategory; //đây là lưu idCategory nhé ("ghi ra đây cho nhớ ")
    if (req.files != null && Array.isArray(req.files) && req.files.length > 0) {
      const rDefault = Number(req.body.rDefault) || 1;
      const uploadedFiles = req.files.map((file) => file.filename);
      if (rDefault < 1 || rDefault > uploadedFiles.length) {
        return res.status(400).json({
          message: "Chỉ số ảnh chính không hợp lệ!",
        });
      }
      product.ImageName = uploadedFiles[rDefault - 1];
      const imagesToSave: Image[] = [];
      req.files.forEach((file, index) => {
        const image = new Image();
        image.LinkImage = file.filename;
        image.product = product; // đây là lưu idProduct nhé nhé (không viết ghi chú đọc chắc chắn deo hiểu được)
        image.ImageMain = index + 1 === rDefault; 
        imagesToSave.push(image); // như đã được khai bảng Mảng ở trên ImageToSave sẽ lần lượt lưu từng ảnh
      });
      try {
        await ProductReponsitory.save(product);
        await ImageReponsitory.save(imagesToSave); // sau khi lưu từng ảnh sẽ lưu tất cảcả
      } catch (error) {
        console.error("Error saving product or images:", error);
        return res
          .status(500)
          .json({ message: "Lưu sản phẩm thất bại", error });
      }
    } else {
      await ProductReponsitory.save(product);
    }
  }

  static async getAllProduct(req: Request, res: Response) {
    // const id = parseInt(req.params.id);
    const product = await ProductReponsitory.find();
    return product;
  }

  static async getProductById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const product = await ProductReponsitory.findOneBy({idProduct:id});
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    return product;
  }

  static async deleteProduct(req: Request, res: Response){
    const id = parseInt(req.params.id); 
    const product = await ProductReponsitory.findOne({where:{idProduct: id},relations:["image"],}); // relation để hiển thị ra tất cả các mối quan hệ của sản phẩmẩm
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    // vì là có quan hệ với "Image" và "category" nên không thể xóa được ("sẽ hiện thị là không thể xóa được vì idProduct còn liên quan đến ảnh và Category")

    if(product.image && product.image.length > 0) { // vì vậy nên cần phải xóa ảnh trước để "Product" không còn liên quan tới ảnh khác, ở đây là bảng "Image" 
    await ImageReponsitory.remove(product.image); 
    }
    // sau khi đã xóa được ảnh thì "Product" sẽ không liên quan đến bảng nào nữa nên có thể xóa được nhé.
    try{
       await ProductReponsitory.remove(product);
    }
    catch(error){
      console.error("Error deleting product:", error);
      return res
       .status(500)
       .json({ message: "Xóa sản phẩm thất bại", error });
    }
    return product;
  }
}
export default ProductService;
