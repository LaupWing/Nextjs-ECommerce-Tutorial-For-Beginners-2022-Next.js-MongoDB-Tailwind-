import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
   name:{
      type: String,
      required: true
   },
   slug:{
      type: String,
      required: true,
      unique: true
   },
   category:{
      type: String,
      required: true
   },
   image:{
      type: String,
      required: true
   },
   price:{
      type: Number,
      required: true
   },
   brand:{
      type: String,
      required: true
   },
   description:{
      type: String,
      required: true
   },
   rating:{
      type: Number,
      required: true,
      default: 0
   },
   numReviews:{
      type: Number,
      default: 0,
      required: true
   },
   countInStock:{
      type: Number,
      default: 0,
      required: true
   },
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product