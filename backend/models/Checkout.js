const mongoose=require("mongoose");
const checkoutItemSechma=mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
},{
    _id:false,
});
const checkoutSechma=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    checkoutItems:[checkoutItemSechma],
    shippingAddress: {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },  // instead of postCode
  country: { type: String, required: true },
},

    paymentMethod:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    paymentStatus:{
        type:String,
        default:"pending",
    },
    isFinalized:{
        type:Boolean,
        default:false,
    },
    finalizedAt:{
        type:Date,
    },

},{
    timestamps:true,
})
module.exports=mongoose.model("Checkout",checkoutSechma);