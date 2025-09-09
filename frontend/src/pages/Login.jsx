import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      navigate("/"); // go to homepage
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-lg w-11/12 max-w-md text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-700 rounded-lg py-3 px-4 mb-4 focus:outline-none focus:ring focus:ring-emerald-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-700 rounded-lg py-3 px-4 mb-6 focus:outline-none focus:ring focus:ring-emerald-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-emerald-500 py-3 rounded-full font-bold hover:bg-emerald-600"
        >
          Log In
        </motion.button>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
