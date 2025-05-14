import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [theme, setTheme] = useState("dracula");

  const handleToggle = (e) => {
    const selectedTheme = e.target.checked ? "winter" : "dracula";
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dracula";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    const toggleInput = document.getElementById("themeInput");
    if (toggleInput) {
      toggleInput.checked = savedTheme === "winter";
    }
  }, []);

  const textColorClass = theme === "winter" ? "text-zinc-900" : "text-white";

  return (
    <div className={`navbar bg-black border-b-2 ${textColorClass}`}>
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">Connect Hub</span>
      </div>

      {/* Theme Toggle Switch */}
      <div className="flex items-center gap-2 pr-4">
        {/* Light Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" />
        </svg>

        {/* Toggle Switch */}
        <input
          id="themeInput"
          type="checkbox"
          className="toggle theme-controller"
          onClick={handleToggle}
        />

        {/* Dark Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"
          />
        </svg>

        <Link to="/login" className="btn btn-primary">
          Login/signup
        </Link>
      </div>
    </div>
  );
}

export default Header;
