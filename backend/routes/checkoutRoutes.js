const express=require("express");
const Cart=require("../models/Cart");
const Checkout=require("../models/Checkout");
const Order=require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const router=express.Router();

router.post('/',protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"no items in checkout"});
    }
    try {
        const newCheckout=await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid:false,
        });
        console.log("cheout is created for",req.user._id);
        res.status(201).json(newCheckout);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
})
router.put("/:id/pay",protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    try {
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout) return res.status(404).json({message:"checkout is not present"});
        if(paymentStatus==="paid"){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        }
        else{
            res.status(400).json({message:"invalid payment Status"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
})
router.post("/:id/finalize",protect,async(req,res)=>{
    try {
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout) return res.status(404).json({message:"checkout is not present"});
        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder=await Order.create({
                user:req.user._id,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDeliverd:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails
            });
            checkout.isFinalized=true;
            checkout.finalizedAt=Date.now();
            await checkout.save();
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(201).json(finalOrder);
        }
        else if(checkout.isFinalized){
            return res.status(400).json({message:"Checkout already finalized"});
        }
        else{
            return res.status(400).json({message:"Checkout is not paid"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
})
module.exports=router;