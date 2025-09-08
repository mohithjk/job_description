import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScrapedJD() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from Flask backend
    fetch("http://127.0.0.1:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching jobs:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 font-sans">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-t-emerald-400 border-b-emerald-400 border-gray-700 rounded-full"
            ></motion.div>
            <p className="mt-4 text-xl text-emerald-400 animate-pulse">
              Fetching jobs...
            </p>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 text-white"
            >
              <h2 className="text-2xl font-bold text-emerald-400">
                {job.title}
              </h2>
              <p className="mt-2 text-lg opacity-90">{job.company}</p>
              <p className="text-sm opacity-80">📍 {job.location}</p>
              <p className="text-sm opacity-80">Remote: {job.remote}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-emerald-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-emerald-600"
              >
                Apply Now 🚀
              </a>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-white text-center text-lg">
            No jobs found. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}

export default ScrapedJD;
