import { Request, Response } from "express";
import "express-session";
declare module "express-session" {
  interface SessionData {
    cart: {
      productId?: number;
      quantity?: number;
    }[];
  }
}

class CartService {
  static async addToCart(req: Request, res: Response) {
    const { productId, quantity } = req.body;
    const parsed = Number(quantity)
    if (!productId || !quantity || quantity <= 0) {
      throw new Error("Invalid productId or quantity");
    }

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingItem = req.session.cart.find(
      (item) => item.productId === productId
    );
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + parsed;
    } else {
      req.session.cart.push({ productId, quantity: parsed });
    }
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
      } else {
      }
    });
    console.log("existing", req.session.cart)
    return req.session.cart;
  }
  static async getCart(req: Request) {
    try {
        return req.session.cart || [];
    } catch (err) {
        console.error("Error fetching cart:", err);
        throw new Error("Failed to fetch cart");
    }
}
}
export default CartService;
