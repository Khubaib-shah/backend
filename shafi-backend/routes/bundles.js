import express from "express";
import Bundle from "../models/Bundle.js";
import mongoose from "mongoose";

const router = express.Router();

// Add a new bundle
router.post("/", async (req, res) => {
  try {
    const bundle = new Bundle(req.body);
    const savedBundle = await bundle.save();
    res.status(201).json(savedBundle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add bundle", details: error.message });
  }
});

// Get all bundles
router.get("/", async (req, res) => {
  try {
    const bundles = await Bundle.find();
    res.status(200).json(bundles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch bundles", details: error.message });
  }
});
// Update bundle
router.put("/", async (req, res) => {
  const { _id, supplier, cost, status } = req.body;

  // Validate _id
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: `Invalid ID: ${_id}`,
    });
  }

  try {
    // Update the bundle
    const updatedBundle = await Bundle.findByIdAndUpdate(
      _id,
      { supplier, cost, status },
      { new: true, runValidators: true }
    );

    // If no bundle is found
    if (!updatedBundle) {
      return res.status(404).json({
        message: `No bundle found with id: ${_id}`,
      });
    }

    // Return the updated bundle
    res.status(200).json(updatedBundle);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update bundle",
      details: error.message,
    });
  }
});

// Generate report
router.get("/report", async (req, res) => {
  try {
    const bundles = await Bundle.find();
    const totalBundles = bundles.length;
    const totalQuantity = bundles.reduce(
      (sum, bundle) => sum + bundle.quantity,
      0
    );
    const totalCost = bundles.reduce((sum, bundle) => sum + bundle.cost, 0);

    res.status(200).json({ totalBundles, totalQuantity, totalCost, bundles });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate report", details: error.message });
  }
});

export default router;
