const Tenant = require("../models/Tenant");

// Upgrade plan (only Admin)
const upgradePlan = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Only Admin can upgrade the plan" });
    }

    const tenant = await Tenant.findById(req.user.tenant);
    if (!tenant) return res.status(404).json({ msg: "Tenant not found" });

    tenant.plan = "Pro";
    await tenant.save();

    res.json({ msg: "Tenant upgraded to Pro successfully", tenant });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { upgradePlan }; 
