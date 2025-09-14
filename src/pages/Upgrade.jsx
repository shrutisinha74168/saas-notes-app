import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const Upgrade = () => {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    try {
      await api.post(`/tenants/${user.tenant}/upgrade`);
      alert("Upgraded to Pro Plan!");
    } catch (err) {
      alert("Upgrade failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-5 shadow-lg rounded-4 text-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 fw-bold">Upgrade to Pro</h2>
        <p className="mb-4 text-muted">
          Unlock advanced features and get more done with the Pro plan.
        </p>
        <motion.button
          onClick={handleUpgrade}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-success btn-lg w-100"
        >
          Upgrade Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Upgrade;
