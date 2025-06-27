const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes")
const cartRoutes=require("./routes/cartRoutes")
const CheckoutRoutes=require("./routes/checkoutRoutes")
const orderRoutes=require("./routes/orderRoutes")
const uploadRoutes=require("./routes/uploadRoutes")
const adminRoutes=require("./routes/adminRoutes")
const adminProductsRoutes=require("./routes/productAdminRoutes")
const adminOrderRoutes=require("./routes/adminOrderRoutes")
const cookieParser = require("cookie-parser");


dotenv.config(); // ✅ Load .env variables early

const app = express();

app.use(express.json()); // ✅ To read req.body
app.use(cors());         // ✅ Enable cross-origin
app.use(cookieParser());
connectDB(); // ✅ DB connection (MongoDB or PostgreSQL)

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to WareWave");
});

// Register user routes
app.use("/api/user", userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",CheckoutRoutes);  
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/admin/products",adminProductsRoutes);
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/orders",adminOrderRoutes);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("✅ Server is running on port", PORT);
});
