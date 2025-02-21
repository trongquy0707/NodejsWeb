import { Request, Response } from "express";
import CardService from "../../services/Client/card.service";

class CardController {
  static async AddtoCart(req: Request, res: Response) {
    try {
      const cart = await CardService.addToCart(req, res);
      const data= {
        message: "Product added to cart",
        data: cart,
      };
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding product to cart" });
    }
  }

  static async GetCart(req: Request, res: Response) {
    try {
      const cart = await CardService.getCart(req);
      const data = {
        message: "Cart fetched successfully",
        data: cart,
      };
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching cart" });
    }
  }
}
export default CardController;
