import express  from "express";
import loginRouter from "./loginRouter.js";
import productRouter from "./sanphamRouter.js";
import cartRouter from "./giohangRouter.js";
const rootRouter = express.Router();

rootRouter.use("/user", loginRouter)
rootRouter.use("/product", productRouter)
rootRouter.use("/cart", cartRouter)
export default rootRouter