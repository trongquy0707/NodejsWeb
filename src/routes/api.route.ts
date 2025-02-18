import express, { Express, NextFunction, Request, Response, Router } from "express";
import RoleController from "../controller/adminController/role.controller";
import CategoryContrller from "../controller/adminController/category.controller";
import upload from "../MiddleWere/upload";
import productController from "../controller/adminController/product.controller";
import { Put } from "tsoa";
import AccountController from "../controller/clientController/account.controller";
import { verifyToken } from "../MiddleWere/verifyToken";
const app: Express = express();
const router: Router = express.Router();
router.post("/client/login",upload.none(), (req, res)=>{
  AccountController.loginUser(req, res);
})
//ROLE
router.use(verifyToken);
router.post("/admin/role/create",upload.none(), (req,res) => {
    RoleController.createRole(req, res);
});

 router.get("/admin/role/list", (req, res) => {
    RoleController.getAllRoles(req, res);
})
 router.delete("/admin/role/delete/:id", (req:Request, res:Response) => {
   const id = req.params.id;
  console.log("role_id", id)
   RoleController.deleteRole(id,req, res,);
})

router.put("/admin/role/updateRole/:id", upload.none(), (req, res) => {
  console.log("role_id", req.body)
   RoleController.updateRole(req, res);
})

//CATEGORY

router.post("/admin/category/create", upload.single("ImageCategory"), (req, res) => {
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

router.put("/admin/category/updateCategory/:id", upload.single("ImageCategory"),(req, res)=>{
  const id = req.params.id;
  CategoryContrller.updateCategory(id,req, res);
})

//Products

router.post("/admin/products/createProduct",upload.array("ImageName"), (req, res)=>{
  productController.createProduct(req, res);
})
router.get("/admin/products/getAllProduct", (req, res)=>{
  productController.getAllProduct(req, res);
})

router.get("/admin/product/getDetailProduct/:id",(req, res)=>{
  productController.getDetailProduct(req, res);
})

router.delete("/admin/product/deleteProduct/:id",(req,res)=>{
  productController.deleteProduct(req, res);
})

router.put("/admin/product/updateProduct/:id", upload.none(), (req, res)=>{
  productController.updateProduct(req, res);
})

// CLIENT 
router.post("/client/SigneIn",upload.none(), (req, res)=>{
  AccountController.createUser(req, res);
})

export default router ;