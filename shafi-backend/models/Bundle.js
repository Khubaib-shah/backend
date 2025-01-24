import mongoose from "mongoose";

const bundleSchema = new mongoose.Schema({
  supplier: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  cost: {
    type: Number,
    required: true,
    min: [0, "Cost must be a positive value"],
  },
  status: {
    type: String,
    enum: ["received", "sale", "pending"],
    default: "pending",
  },
  receivedAt: { type: Date },
});

const Bundle = mongoose.model("Bundle", bundleSchema);
export default Bundle;
