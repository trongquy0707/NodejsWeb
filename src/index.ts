import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import router from "./routes/api.route";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })
// const multer  = require('multer')
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
dotenv.config();


const app: Express = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(session({
  secret: 'mykey', // ma hoa ID session
  resave: false, // khong luu lai session neu khong thay doi
  saveUninitialized: true, // luu lai session khi chua duoc khoi tao
}))

app.use((req, res,next) => {
  res.locals.session  = req.session;
  next();
})

app.use("/api", router)
AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection failed:", error));
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});