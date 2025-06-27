const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");
const Cart=require("./models/Cart");
dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONG_URI);
const seedData = async () => {
    try {
      // Clear existing data
      await Product.deleteMany();
      await User.deleteMany();
      await Cart.deleteMany();
      // Create a default admin User
      const createdUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      });
      const userId=createdUser._id;
      const sampleproducts=products.map((product)=>{
          return {...product,users:userId}
      })
      await Product.insertMany(sampleproducts);
      console.log("product insert successfull");
      process.exit();
    } catch (error) {
      console.error(error);
    }
  };
  
seedData()