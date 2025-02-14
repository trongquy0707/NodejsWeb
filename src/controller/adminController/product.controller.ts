import { Request, Response } from "express";
import ProductService from "../../services/product.service";

class productController {
  static async createProduct(req: Request, res: Response) {
    try {
      console.log("day la contrller produc");
      const product = await ProductService.createProduct(req, res);

      const data = {
        message: "Product created successfully",
        data: product,
      };
      res.json(data);
    } catch (err) {
      console.log("Lỗi gì he");
      const data = {
        message: "Error creating product",
      };
      res.json(data);
    }
  }

  static async getAllProduct(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProduct(req, res);
      const data = {
        message: "Products fetched successfully",
        data: products,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "Error fetching products",
      };
      res.json(data);
    }
  }

  static async getDetailProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductById(req, res);
      const data = {
        message: "Product fetched successfully",
        data: product,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "Error fetching product",
      };
      res.json(data);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const deleteProduct = await ProductService.deleteProduct(req, res);
      const data = {
        message: "Product deleted successfully",
        data: deleteProduct,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "Error deleting product",
      };
      res.json(data);
    }
  }
  static async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct = await ProductService.updateProduct(req, res);
      const data = {
        message: "Product updated successfully",
        data: updatedProduct,
      };
      res.json(data);
    } catch (err) {
      const data = {
        message: "Error updating product",
      };
      res.json(data);
    }
  }
}

export default productController;
