import express, {Express, Router } from "express";
import CardController from "../controller/clientController/cart.controller";
import upload from "../MiddleWere/upload";
const app: Express = express();
const routerClient = express.Router();

routerClient.post("/cart/addtoCard",upload.none(),(req, res) => {
    console.log("card added",req.body);
    CardController.AddtoCart(req, res);
})
routerClient.get("/cart/ListItem",(req, res) => {
    CardController.GetCart(req, res);
})
export default routerClient;