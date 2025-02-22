const LiveMarketSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    currentPrice: Number,
    lastUpdated: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("LiveMarket", LiveMarketSchema);
  