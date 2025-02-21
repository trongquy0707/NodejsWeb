import { NextFunction, Request, Response } from "express"
export const isAdmin = (req: any, res: Response, next: NextFunction) => {
    const { userLogin } = req.session;
    console.log("quyzz",req.session);
    const currentRoleID = userLogin.role.idRole;
    console.log('currentRoleID', currentRoleID);
    if (currentRoleID == 2) {
        next();
    } else {
        res.render('error/403.ejs');
    }
}