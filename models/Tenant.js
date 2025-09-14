const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  subscriptionPlan: { type: String, enum: ["Free", "Pro"], default: "Free" }
});

module.exports = mongoose.model("Tenant", tenantSchema);
