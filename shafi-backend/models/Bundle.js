import mongoose from "mongoose";

const bundleSchema = new mongoose.Schema({
  supplier: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  receivedAt: { type: Date, default: Date.now },
});

const Bundle = mongoose.model("Bundle", bundleSchema);
export default Bundle;
