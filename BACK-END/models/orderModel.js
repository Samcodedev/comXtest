const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    orderType: { type: String, enum: ["buy", "sell"], required: true },
    quantity: Number,
    price: Number,
    status: { type: String, enum: ["open", "closed", "cancelled"], default: "open" },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Order", OrderSchema);
  