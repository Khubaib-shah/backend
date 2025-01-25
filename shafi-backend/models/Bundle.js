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
    enum: ["Received", "In_Production", "Ready_For_Sale", "Sold", "Returned"],
    default: "Received",
  },
  receivedAt: {
    type: Date,

    default: Date.now,
  },
});

const Bundle = mongoose.model("Bundle", bundleSchema);
export default Bundle;
