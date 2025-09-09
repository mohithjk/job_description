import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScrapedJD() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl text-brand-primary sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 drop-shadow-sm">
        Scraped Jobs
      </h1>

      {jobs.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl shadow border border-b-0 border-white/20">
          <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
            <thead className="bg-brand-primary text-white text-left uppercase tracking-wide sticky top-0 z-10">
              <tr>
                <th className="p-2 sm:p-3">#</th>
                <th className="p-2 sm:p-3">Title</th>
                <th className="p-2 sm:p-3">Company</th>
                <th className="p-2 sm:p-3">Location</th>
                <th className="p-2 sm:p-3">Remote</th>
                <th className="p-2 sm:p-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition border-b border-b-gray-600"
                >
                  <td className="p-2 sm:p-3">{index + 1}</td>
                  <td className="p-2 sm:p-3 font-semibold">{job.title}</td>
                  <td className="p-2 sm:p-3">{job.company}</td>
                  <td className="p-2 sm:p-3">{job.location}</td>
                  <td className="p-2 sm:p-3">
                    {job.remote ? (
                      <span className="text-brand-accent font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3">
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 text-nowrap"
                    >
                      Apply
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p
          className="text-center text-sm sm:text-base md:text-lg mt-6"
          style={{ color: "var(--color-brand-muted)" }}
        >
          ⏳ Loading jobs, please wait...
        </p>
      )}
    </div>
  );
}

export default ScrapedJD;
