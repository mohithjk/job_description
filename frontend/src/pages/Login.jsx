import React, { useState } from "react";
import { motion } from "framer-motion";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");

  const handleLogin = () => {
    if (name && email && skills) {
      onLogin({ name, email, skills });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Login Form Container */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-11/12 max-w-lg z-10 border border-white border-opacity-20"
      >
        <h2 className="text-3xl font-bold mb-3 text-emerald-400">👋 Welcome to JobSpy!</h2>
        <p className="text-lg mb-8 text-white text-opacity-80">
          Enter your details to find your dream job.
        </p>
        
        {/* Input Fields */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700 bg-opacity-40 text-white rounded-xl py-3 px-5 transition duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-opacity-50 placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-700 bg-opacity-40 text-white rounded-xl py-3 px-5 transition duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-opacity-50 placeholder-gray-400"
          />
          <textarea
            placeholder="Your skills (e.g., Python, JavaScript, React)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-slate-700 bg-opacity-40 text-white rounded-xl py-3 px-5 transition duration-300 ease-in-out hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-opacity-50 placeholder-gray-400 resize-none"
            rows="3"
          />
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:from-emerald-600 hover:to-emerald-700"
        >
          Start Job Hunting!
        </motion.button>

        <p className="text-xs text-center text-white text-opacity-50 mt-4">By continuing, you agree to our terms and conditions.</p>
      </motion.div>
    </div>
  );
}

export default Login;
