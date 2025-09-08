import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function ResumeAI() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatReady, setIsChatReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Handle chat container scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle auto-focus on textarea
  useEffect(() => {
    if (isChatReady && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isChatReady]);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setIsLoading(true);

    // Simulate text extraction from a file
    const fakeExtractedText = `John Doe, Senior Software Engineer, New York.
Skills: JavaScript, Python, React, Node.js.
Experience: Built and deployed a full-stack e-commerce platform, achieving a 20% increase in user engagement.
Education: Master of Science in Computer Science.`;

    setResumeText(fakeExtractedText);
    setIsLoading(false);
    setIsChatReady(true);

    setMessages([
      {
        text: "Hey there! I've processed your resume. It's now ready for editing. What would you like to focus on?",
        sender: "bot",
      },
    ]);
    setAiSuggestions(["Analyze Skills", "Review Experience", "Make professional"]);
  };

  const handleAsk = async (userPrompt) => {
    const finalPrompt = userPrompt || prompt;
    if (!finalPrompt.trim()) return;

    const userMessage = { text: finalPrompt, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPrompt("");
    setIsLoading(true);
    setAiSuggestions([]);

    let botResponse = "I'm not sure how to help with that. Please ask about your skills, experience, or education.";
    let suggestions = ["Analyze Skills", "Review Experience", "Give General Feedback"];
    let newText = resumeText;

    if (finalPrompt.toLowerCase().includes("skills")) {
      botResponse = "I see strong skills in **React** and **Node.js**. To improve, you could add project details that demonstrate these skills in a practical setting. Would you like me to find some project ideas?";
      suggestions = ["Suggest React projects", "Suggest Node.js projects", "Analyze another section"];
    } else if (finalPrompt.toLowerCase().includes("experience")) {
      botResponse = "Your experience in building and deploying a platform is impressive. To make it even better, consider adding specific metrics or results for your other roles. For example, 'increased conversion rate by X%'.";
      suggestions = ["Help me quantify my achievements", "Find similar job descriptions", "Analyze another section"];
    } else if (finalPrompt.toLowerCase().includes("professional")) {
      const originalText = resumeText;
      newText = originalText
        .replace("Built and deployed", "Spearheaded the development and deployment of")
        .replace("achieving a 20% increase", "resulting in a 20% increase")
        .replace("John Doe", "Jane Doe"); // Example edit
      
      setResumeText(newText);
      botResponse = "I've made some of your language more professional and impactful. You can see the changes above and feel free to edit them directly.";
      suggestions = ["Revert changes", "Make more concise", "Analyze another section"];
    } else {
      botResponse = "I am a simple bot. Please ask to make professional changes to the resume text. Thank you!";
      suggestions = ["Make professional", "Analyze another section"];
    }

    const botMessage = { text: botResponse, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setAiSuggestions(suggestions);
    setIsLoading(false);
  };

  const Card = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800 p-8 rounded-2xl shadow-xl w-11/12 max-w-4xl mb-8"
    >
      {children}
    </motion.div>
  );

  const Message = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-lg max-w-[85%] ${
        message.sender === "user"
          ? "bg-emerald-500 text-white self-end rounded-br-none"
          : "bg-slate-700 text-white rounded-bl-none"
      }`}
    >
      {message.text}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold mb-2 text-emerald-400">
          JobSpy
        </h1>
        <p className="text-xl text-white opacity-80">Find Your Dream Job</p>
      </motion.div>

      {/* Upload Resume Section */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4">📂 Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleUpload}
          className="w-full text-white bg-slate-700 rounded-lg py-3 px-4 transition duration-300 ease-in-out hover:bg-slate-600 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-opacity-50 cursor-pointer"
        />
      </Card>

      {/* Resume Text Preview */}
      {isChatReady && (
        <Card>
          <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
            📄 Extracted Resume Text
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white text-gray-900 p-6 rounded-lg max-h-96 overflow-y-auto shadow-inner"
          >
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full h-full p-2 bg-transparent border-none focus:outline-none resize-none font-mono text-sm"
            ></textarea>
          </motion.div>
        </Card>
      )}

      {/* AI Chat */}
      {isChatReady && (
        <Card>
          <h2 className="text-2xl font-semibold mb-4">💬 Chat with the AI</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-4 p-4 h-80 overflow-y-auto bg-slate-700 rounded-lg"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg max-w-[85%] bg-slate-700 text-white rounded-bl-none self-start">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                </div>
              </div>
            )}
          </motion.div>
          
          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAsk(suggestion)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-700 text-white text-sm px-4 py-2 rounded-full border-2 border-emerald-500 transition-colors hover:bg-emerald-500"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          )}

          <div className="flex mt-4 space-x-2">
            <textarea
              ref={textareaRef}
              placeholder="Ask AI about your resume..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              className="flex-grow text-white bg-slate-700 rounded-lg p-3 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-opacity-50"
              rows="1"
            />
            <motion.button
              onClick={() => handleAsk()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-emerald-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </motion.button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ResumeAI;
