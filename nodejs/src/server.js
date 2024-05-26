import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import apiWebRoutes from "./route/web";
// import apiWebRoutes from "./route/api";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
configViewEngine(app);
apiWebRoutes(app);
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend server is running on the port: " + port);
});
