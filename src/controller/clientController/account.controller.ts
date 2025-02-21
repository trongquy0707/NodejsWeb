import { Request, Response } from "express";
import UserService from "../../services/Client/user.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
import session from 'express-session';
declare module 'express-session' {
  interface SessionData {
    userIdLogin?: number;
    userLogin?: any; 
  }
}
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
class AccountController {
  static async createUser(req: Request, res: Response) {
    try{
        
        const user = await UserService.createUser(req, res);
        const data = {
          message: "User created successfully",
          data: user,
        };
        res.json(data);
    }catch(err){
        console.log(err);
        const data = {
          message: "Error creating user",
        };
        res.json(data);
    }
  
  }
  
  static async loginUser(req: Request, res: Response) {
    try {
        const user: any = await UserService.loginUser(req, res);

        if (!user) {
            res.cookie("errorLogin", "Invalid Email or Password", {
                maxAge: 1000,
                httpOnly: true,
            });
            return res.redirect("/login");
        }

        // ✅ Kiểm tra trước khi lưu vào session
        console.log("User before saving to session:", user);

        req.session.regenerate((err: any) => {
            if (err) {
                console.error("Session regeneration error:", err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            req.session.userIdLogin = user.idUser;
            req.session.userLogin = user;

            req.session.save((err: any) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).json({ message: "Session save error" });
                }

                console.log("Session after setting user:", req.session); // ✅ Debug session

                // ✅ Tạo JWT
                const token = jwt.sign(
                    {
                        userId: user.idUser,
                        email: user.email,
                        role: user.role,
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                return res.json({ message: "Login successful", token });
            });
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Error logging in user" });
    }
}
}
export default AccountController;
