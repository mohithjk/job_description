import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

function ResumeAI() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    processFile(droppedFile);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    const fakeText = `Extracted text from ${selectedFile.name} will appear here...`;
    setResumeText(fakeText);
    setAiResponse("");
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    processFile(selectedFile);
  };

  const handleAsk = () => {
    if (!prompt) return;
    setAiResponse(
      `🤖 AI Bot says: "You asked: '${prompt}' about your resume."`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-8 font-inter bg-brand-bg text-brand-text">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary">
          JobSpy 🔍
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-brand-muted">
          Upload your resume and chat with AI instantly
        </p>
      </motion.div>

      {/* Drag & Drop Zone */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 sm:p-12 md:p-16 text-center rounded-xl border-2 border-dashed border-brand-accent cursor-pointer hover:bg-gray-800"
        onClick={() => document.getElementById("resumeInput").click()}
      >
        <p className="text-sm sm:text-base md:text-lg text-brand-muted">
          📂 Drag & drop your resume here, or click to upload
        </p>
        <input
          type="file"
          id="resumeInput"
          accept=".pdf,.docx"
          onChange={handleUpload}
          className="hidden"
        />
      </motion.div>

      {/* Resume Text Preview */}
      {resumeText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl mt-8 p-6 rounded-xl border border-brand-muted bg-transparent max-h-72 overflow-y-auto"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-brand-accent">
            Extracted Resume Text
          </h3>
          <pre className="whitespace-pre-wrap text-sm sm:text-base md:text-lg text-brand-text">
            {resumeText}
          </pre>
        </motion.div>
      )}

      {/* AI Chat */}
      {resumeText && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-2xl mt-8 p-6 rounded-xl border border-brand-muted bg-transparent"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-accent">
            Ask the AI
          </h2>
          <textarea
            placeholder="Ask AI about your resume..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full mt-4 p-3 rounded-lg border border-brand-muted min-h-[100px] font-inter focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm sm:text-base md:text-lg"
          />
          <motion.button
            onClick={handleAsk}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 rounded-lg bg-brand-primary text-white font-semibold shadow hover:opacity-90 transition text-sm sm:text-base"
          >
            Ask AI
          </motion.button>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 rounded-lg border border-brand-accent bg-brand-bg"
            >
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-brand-accent mb-2">
                AI Response:
              </h3>
              <p className="text-sm sm:text-base md:text-lg">{aiResponse}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ResumeAI;
