const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tenant = require("../models/Tenant");

// Register User (only for seeding predefined accounts)
exports.register = async (req, res) => {
  try {
    const { email, password, role, tenantSlug } = req.body;

    const tenant = await Tenant.findOne({ slug: tenantSlug });
    if (!tenant) return res.status(400).json({ msg: "Tenant not found" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      tenant: tenant._id
    });

    await user.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("tenant");
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, tenant: user.tenant._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { email: user.email, role: user.role, tenant: user.tenant.slug } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
