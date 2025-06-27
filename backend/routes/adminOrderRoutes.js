const express=require("express");
const Order=require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const router=express.Router();
router.get("/",protect,admin,async(req,res)=>{
    try {
        const orders=await Order.find({}).populate("user","name email");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})
router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(order){
            order.status=req.body.status || order.status;
            order.isDeliverd=req.body.status==="Delivered"?true:false;
            order.deliveredAt=req.body.status==="Delivered"?Date.now():order.deliveredAt;
        }
        const updatedOrder=await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})
router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        let order=await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
        res.json({message:"Order deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})
module.exports=router;