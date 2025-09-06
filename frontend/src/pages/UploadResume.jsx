// ResumeAI.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

function ResumeAI() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const fakeText = `📄 Extracted text from ${selectedFile.name} will appear here...`;
    setResumeText(fakeText);
    setAiResponse("");
  };

  const handleAsk = () => {
    if (!prompt) return;
    setAiResponse(`🤖 AI Bot says: "You asked: '${prompt}' about your resume."`);
  };

  const cardStyle = {
    borderRadius: "20px",
    padding: "2rem",
    marginBottom: "2rem",
    width: "90%",
    maxWidth: "1000px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    color: "white",
    background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4ff", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "3rem", background: "linear-gradient(135deg, #6b21a8, #3b82f6)", padding: "3rem 2rem", borderRadius: "20px", width: "90%", maxWidth: "1000px", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>💼 Smart Resume AI</h1>
        <p style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#e0e7ff" }}>Upload your resume and chat with AI instantly!</p>
      </motion.div>

      {/* Upload Resume Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={cardStyle}
      >
        <h2>📂 Upload Resume</h2>
        <input type="file" accept=".pdf,.docx" onChange={handleUpload} style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ccc", marginTop: "1rem", background: "#fff", color: "#000" }} />
      </motion.div>

      {/* Resume Text Preview */}
      {resumeText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ ...cardStyle, background: "#fff", color: "#1e3a8a", maxHeight: "400px", overflowY: "auto" }}
        >
          <h3 style={{ color: "#1e3a8a" }}>📄 Extracted Resume Text</h3>
          <pre style={{ whiteSpace: "pre-wrap", color: "#111" }}>{resumeText}</pre>
        </motion.div>
      )}

      {/* AI Chat */}
      {resumeText && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ ...cardStyle, background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
        >
          <h2>💬 Ask the AI</h2>
          <textarea
            placeholder="Ask AI about your resume..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid #ccc", minHeight: "120px", marginTop: "1rem" }}
          />
          <motion.button
            onClick={handleAsk}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: "1rem", padding: "0.8rem 1.5rem", borderRadius: "10px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            Ask AI
          </motion.button>

          {aiResponse && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "10px", background: "#e0f2fe", color: "#0369a1" }}>
              <h3>🤖 AI Response:</h3>
              <p>{aiResponse}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ResumeAI;
