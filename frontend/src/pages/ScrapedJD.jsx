import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScrapedJD() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from Flask backend
    fetch("http://127.0.0.1:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => console.error("❌ Error fetching jobs:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        🔍 Recommended Jobs
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-white/30 text-white"
            >
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="mt-2 text-lg opacity-90">{job.company}</p>
              <p className="text-sm opacity-80">📍 {job.location}</p>
              <p className="text-sm opacity-80">Remote: {job.remote}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Apply Now 🚀
              </a>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center text-lg">
            ⏳ Loading jobs, please wait...
          </p>
        )}
      </div>
    </div>
  );
}

export default ScrapedJD;
