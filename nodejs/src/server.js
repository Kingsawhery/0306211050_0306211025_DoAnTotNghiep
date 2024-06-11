import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import apiWebRoutes from "./route/web";
// import apiWebRoutes from "./route/api";
import cors from "cors";
import dotenv from "dotenv";

const cookieParser = require("cookie-parser");
dotenv.config();
let app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://localhost:3001",
    // your origins here
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
configViewEngine(app);
apiWebRoutes(app);
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend server is running on the port: " + port);
});
