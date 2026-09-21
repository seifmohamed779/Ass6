import { Router } from "express";
import { productDetails } from "./broduct.services.js";
const productRouter=Router()
productRouter.get("/product-data/:productId",(req,res)=>{
    const result=productDetails(req.params.productId)
    res.json(result);
})
export default productRouter