import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port 5000");
});
