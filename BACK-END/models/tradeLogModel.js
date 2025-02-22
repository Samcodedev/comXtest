const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    matchedPrice: Number,
    quantity: Number,
    tradeDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Trade", TradeSchema);
  