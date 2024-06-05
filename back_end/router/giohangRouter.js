import express from "express";
import { addToCart, deleteCart, getCartByUserId} from "../controllers/giohangController.js";

const cartRouter = express.Router();

cartRouter.get("/get-all-cart/:id", getCartByUserId);
cartRouter.post("/add-to-cart", addToCart);
cartRouter.post("/delete-item-cart/:cartId", deleteCart);


export default cartRouter;
