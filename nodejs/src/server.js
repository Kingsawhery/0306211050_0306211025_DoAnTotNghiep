import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import apiWebRoutes from "./route/web";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

let app = express();
// Cấu hình CORS với các tùy chọn cụ thể
const corsOptions = {
  origin: ["http://localhost:3000"], // Chỉ cho phép các nguồn gốc cụ thể
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Chỉ định các phương thức HTTP được cho phép
  allowedHeaders: ["Content-Type", "Authorization"], // Chỉ định các tiêu đề được cho phép
  credentials: true, // Cho phép gửi cookies qua CORS
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
apiWebRoutes(app);

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend server is running on the port: " + port);
});
