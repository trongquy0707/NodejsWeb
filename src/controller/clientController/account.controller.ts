import { Request, Response } from "express";
import UserService from "../../services/user.service";
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
import jwt from "jsonwebtoken";
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
      const user:any = await UserService.loginUser(req, res);
     
      if (user) {
        //luu lai session login
        req.session.regenerate(function (err: any) {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }
            // store user information in session, typically a user id
            (req.session as any).userIdLogin = user.idUser;
            (req.session as any).userLogin = user;
            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err: any) {
                if (err) {
                    res.status(500).json({ message: "Session save error" });
                    return;
                }
            })
        })
        // 2. Tạo và trả về JWT
        const token = jwt.sign(
            {
                userId: user.idUser,
                email: user.email,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        // 3. Trả về JSON nếu là request từ API
        if (req.headers["content-type"] === "application/json") {
            return res.json({ message: "Login successful", token });
        }
        return res.json({ message: "Login successful", token });
        // 4. Nếu là request từ trang web thì redirect
        // res.redirect("/home");
    } else {
        // 5. Đăng nhập thất bại, lưu cookie lỗi
        res.cookie("errorLogin", "Invalid Email or Password", {
            maxAge: 1000,
            httpOnly: true,
        });
        res.redirect("/login");
    }

      }
    catch (err) {
      console.log(err);
      const data = {
        message: "Error logging in user",
      };
      res.status(500).json(data);
    }
  }
}
export default AccountController;
