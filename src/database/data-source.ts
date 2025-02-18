import { DataSource } from "typeorm"; 
import "dotenv/config";
import Bill from "../entities/Bill";
import BillDetails from "../entities/BillDetail";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: 3306 ,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: ["src/entities/**.ts"],
    subscribers: [],
    migrations: ["src/migrations/*.ts"], // Đảm bảo đúng đường dẫn

});
