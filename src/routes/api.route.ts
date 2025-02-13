import express, { Express, NextFunction, Request, Response, Router } from "express";
import RoleController from "../controller/adminController/role.controller";
import CategoryContrller from "../controller/adminController/category.controller";
import upload from "../MiddleWere/upload";
import productController from "../controller/adminController/product.controller";
const app: Express = express();
const router: Router = express.Router();

//ROLE
router.post("/admin/role/create", (req, res) => {
    console.log("day la ben router", req.body)
    RoleController.createRole(req, res);
})

 router.get("/admin/role/list", (req, res) => {
    RoleController.getAllRoles(req, res);
})
 router.delete("/admin/role/delete/:id", (req:Request, res:Response) => {
   const id = req.params.id;
  console.log("role_id", id)
   RoleController.deleteRole(id,req, res,);
})

//CATEGORY

router.post("/admin/category/create", upload.single("ImageCategory"), (req, res) => {
  console.log("✅ Request body:", req.body); // Kiểm tra dữ liệu text
  console.log("✅ Uploaded file:", req.file); // Kiểm tra toàn bộ thông tin file
  CategoryContrller.createCategory(req, res);
});

router.get("/admin/category/list", (req, res) => {
  CategoryContrller.getAllCategories(req, res);
});
router.delete("/admin/category/deleteCategory/:id",(req,res)=>{
  const id = req.params.id;
  console.log("category_id", id)
  CategoryContrller.deleteCategory(id,req, res);
})

//Products

router.post("/admin/products/createProduct",upload.array("ImageName"), (req, res)=>{
  console.log(" Request body roter:", req.body); // Kiểm tra dữ liệu text
  console.log(" Uploaded file:", req.files); // Kiểm tra toàn bộ thông tin file
  // productController.createProduct(req, res);
})

export default router ;