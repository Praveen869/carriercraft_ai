import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const location = useLocation(); // current route path

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (token) {
      setIsAuthenticated(true);
      setUserName(storedName || "User");
      setUserEmail(storedEmail || "");
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]); // fires on every route change!

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setShowDropdown(false);
    window.location.href = "/"; // redirect and force hard refresh to clear all states!
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const links = isAuthenticated ? baseLinks : [...baseLinks, ...authLinks];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">
      {/* Premium custom colored ocean blue gradient glass capsule */}
      <nav className="max-w-7xl mx-auto bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-blue-50/90 border border-blue-200/50 backdrop-blur-lg shadow-[0_8px_32px_rgba(37,99,235,0.04)] rounded-full px-6 py-2.5 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3.5 tracking-tight hover:opacity-90 transition duration-150">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center shadow-lg border border-white/20 transform hover:rotate-6 transition-transform duration-300">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c.5 3 2.5 5 5.5 5.5-3 .5-5 2.5-5.5 5.5-.5-3-2.5-5-5.5-5.5 3-.5 5-2.5 5.5-5.5zm0 14c.3 2 1.7 3.3 3.7 3.7-2 .3-3.3 1.7-3.7 3.7-.3-2-1.7-3.3-3.7-3.7 2-.3 3.3-1.7 3.7-3.7zM6 15c.2 1.3 1.1 2.2 2.4 2.4-1.3.2-2.2 1.1-2.4 2.4-.2-1.3-1.1-2.2-2.4-2.4 1.3-.2 2.2-1.1 2.4-2.4z" />
            </svg>
          </div>
          <span className="font-cormorant font-black text-slate-800 tracking-wide text-3xl sm:text-4xl leading-none select-none">
            CareerCraft <span className="text-[#2563EB] italic font-bold ml-1">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links & User Profile Badge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="space-x-1 flex items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-extrabold px-4 py-2 rounded-full transition-all duration-150 ${
                  location.pathname === link.path 
                    ? "text-white bg-[#2563EB] shadow-sm shadow-blue-500/10" 
                    : "text-slate-800 hover:text-black hover:bg-black/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile Initial Badge & Dropdown */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center shadow-md border border-white/20 text-white font-extrabold text-sm cursor-pointer select-none transition duration-150 transform hover:scale-[1.03] active:scale-[0.97]"
              >
                {userName.charAt(0).toUpperCase()}
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-3.5 w-60 bg-white/95 border border-blue-200/50 backdrop-blur-lg shadow-xl rounded-2xl p-4 animate-slide-in z-50 text-slate-800">
                  <div className="border-b border-slate-100 pb-3 mb-3">
                    <p className="font-extrabold text-sm text-slate-900 truncate">{userName}</p>
                    <p className="text-[10px] text-slate-550 truncate mt-0.5">{userEmail}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 bg-red-50 hover:bg-red-100/70 text-red-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Logout Account
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && (
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-xs border border-white/20 select-none">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#2563EB] hover:text-[#1D4ED8] focus:outline-none text-2xl transition"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Premium Custom colored glass container */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-blue-50/95 via-white/95 to-indigo-50/95 border border-blue-200/60 backdrop-blur-lg shadow-xl rounded-3xl mt-2 p-4 animate-slide-in max-w-sm mx-auto">
          {isAuthenticated && (
            <div className="px-4 py-3 border-b border-blue-100/60 mb-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm border border-white/20 select-none">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="font-extrabold text-xs text-slate-900 truncate">{userName}</p>
                <p className="text-[9px] text-slate-550 truncate mt-0.5">{userEmail}</p>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-bold transition ${
                  location.pathname === link.path 
                    ? "text-white bg-[#2563EB] shadow-md shadow-blue-500/10" 
                    : "text-slate-800 hover:text-black hover:bg-black/5"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left block px-4 py-2.5 rounded-xl text-base font-bold text-red-600 hover:bg-red-50 transition cursor-pointer mt-1"
              >
                Logout Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
