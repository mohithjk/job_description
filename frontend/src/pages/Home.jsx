import React from 'react';

function Home() {
  const features = [
    {
      title: "Resume Upload",
      desc: "Upload your resume and get quick job matches.",
    },
    {
      title: "Advanced Filters",
      desc: "Easily filter jobs by role, location, and skills.",
    },
    {
      title: "Expert Insights",
      desc: "Detailed analytics help you target the right companies.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white font-sans snap-y snap-mandatory flex flex-col overflow-hidden">
      
      {/* HERO + ABOUT */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center snap-start px-4 py-8">
        <div
          className="w-full lg:w-5/6 flex flex-col items-center text-center mx-auto"
          style={{ gap: "2rem" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-xl w-full">
            Find Your <span className="text-green-400 animate-pulse">Dream Job</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 w-full max-w-3xl mx-auto">
            Upload your resume or browse job descriptions tailored for you.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-md mx-auto">
            <button className="bg-green-400 text-gray-900 px-8 py-3 w-full md:w-auto rounded-md font-bold shadow-2xl hover:bg-green-300 transform hover:scale-105 transition duration-200">
              Upload Resume
            </button>
            <button className="border-2 border-green-400 text-green-400 px-8 py-3 w-full md:w-auto rounded-md font-bold hover:bg-green-400 hover:text-gray-900 transform hover:scale-105 transition duration-200">
              View JDs
            </button>
          </div>
          <div className="w-full lg:w-3/5 mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 text-left">About JobSpy</h2>
              <p className="text-lg text-gray-300 text-left leading-relaxed">
                JobSpy simplifies your job hunt. Upload your resume to get matched with the best opportunities, or explore tailored job descriptions to find your perfect fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES + HOW TO USE */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 snap-start px-4 py-8">
        <div className="w-full lg:w-5/6 mx-auto flex flex-col items-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 text-center w-full">Features</h2>
          <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-8">
            {features.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-7 shadow-2xl flex-1 w-full text-center transition-all duration-300 hover:bg-green-400 hover:text-gray-900 hover:shadow-green-400/40"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-green-300">{title}</h3>
                <p className="text-gray-300 text-base md:text-lg">{desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-3/5 mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 text-left">How to Use</h2>
              <ol className="list-decimal list-inside text-lg md:text-xl space-y-4 text-gray-300 text-left leading-relaxed">
                <li>Tap <span className="text-green-400 font-semibold">Upload Resume</span> to submit your CV.</li>
                <li>Browse or filter job descriptions via <span className="text-green-400 font-semibold">View JDs</span>.</li>
                <li>Apply to listings that match your preferences and skills.</li>
                <li>Stay updated with analytics for new opportunities.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
