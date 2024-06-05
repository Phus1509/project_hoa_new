import express from "express";
import { getProduct, getProductDetail } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/get-all-product", getProduct);
productRouter.get("/get-product-detail/:id", getProductDetail);


export default productRouter;
