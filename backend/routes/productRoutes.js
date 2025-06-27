const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");
// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", protect,admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku, // ✅ Add SKU if required in schema
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metDescription,
      metKeywords,
      dimenstions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku, // ✅ Include this
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metDescription,
      metKeywords,
      dimenstions,
      weight,
      users: req.user._id, // ✅ MATCH your schema field name
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/best-seller",async(req,res)=>{
      try {
        const bestSeller=await Product.findOne().sort({rating:-1});
        if(bestSeller) return res.json(bestSeller);
        else return res.status(404).json({message:"Product not found"})
      } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
      }
})
router.get("/new-arrivals",async(req,res)=>{
  try {
     const newArrivals=await Product.find().sort({creatAt:-1}).limit(8);
     res.json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server Error"});
  }
})
router.put("/:id", protect,admin, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product)
        return res.status(404).json({ message: "Product not found" });
  
      // Update fields
      const fields = [
        "name", "description", "price", "discountPrice", "countInStock", "sku",
        "category", "brand", "sizes", "colors", "collections", "material", "gender",
        "images", "isFeatured", "isPublished", "tags", "metaTitle", "metDescription",
        "metKeywords", "dimenstions", "weight"
      ];
      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          product[field] = req.body[field];
        }
      });
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  });
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            await product.deleteOne()
            res.json(req.params.id)
        }
    }
    catch(err){
       console.lof(err);
       res.status(500).json("message:server error")
    }
})
router.get("/", async (req, res) => {
  const {
    collection,
    category,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    material,
    brand,
    limit
  } = req.query;

  let query = {};
  let sort = {};

  if (collection && collection.toLowerCase() !== "all") {
    query.collections = collection;
  }

  if (category && category.toLowerCase() !== "all") {
    query.category = category;
  }

  if (material) {
    query.material = { $in: material.split(",") };
  }

  if (brand) {
    query.brand = { $in: brand.split(",") };
  }

  if (size) {
    query.sizes = { $in: size.split(",") };
  }

  if (color) {
    query.colors = { $in: color.split(",") };
  }

  if (gender) {
    query.gender = gender;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Search Logic
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Sort Logic
  switch (sortBy) {
    case "priceAsc":
      sort = { price: 1 };
      break;
    case "priceDesc":
      sort = { price: -1 };
      break;
    case "popularity":
      sort = { rating: -1 };
      break;
    default:
      sort = { createdAt: -1 }; // Default sort: newest products
  }

  try {
    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
          res.json(product);
        }
        else{
          res.status(404).json({message:"Product Not Found"});
        }
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:"Server error"}); 
    }
})
router.get("/similar/:id",async(req,res)=>{
    const {id}=req.params;
    try{
         const product=await Product.findById(id);
         if(!product) return res.status(404).json({message:"Product not Found"});
         const similarProducts=await Product.find({
            _id:{$ne:product._id},
            gender:product.gender,
            category:product.category,
         }).limit(4);
         res.json(similarProducts);
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:"Server error"})
    }
})

module.exports = router;
 