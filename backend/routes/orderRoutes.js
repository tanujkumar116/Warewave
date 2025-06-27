const express=require("express");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const Order=require("../models/Order")
const { protect, admin } = require("../middleware/authMiddleware");
const router=express.Router();
// specific route first
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// generic route last
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports=router;