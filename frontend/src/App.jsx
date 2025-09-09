import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-brand-bg text-brand-text">
      {/* Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-color-brand-primary">
            JobSpy
          </h1>

          {/* Nav Links */}
          <nav className="space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-base font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-brand-primary transition ${
                  isActive ? "text-brand-primary" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `hover:text-brand-primary transition ${
                  isActive ? "text-brand-primary" : ""
                }`
              }
            >
              Upload Resume
            </NavLink>
            <NavLink
              to="/jds"
              className={({ isActive }) =>
                `hover:text-brand-primary transition ${
                  isActive ? "text-brand-primary" : ""
                }`
              }
            >
              Job Descriptions
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `hover:text-brand-primary transition ${
                  isActive ? "text-brand-primary" : ""
                }`
              }
            >
              Analytics
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-brand-muted">
        © {new Date().getFullYear()} JobSpy
      </footer>
    </div>
  );
}

export default App;
