const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    symbol: String, // e.g., "SSBS" for Soybeans
    bidPrice: Number,
    offerPrice: Number,
    quantityAvailable: Number,
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Product", ProductSchema);
  