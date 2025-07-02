import { useContext, useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaPalette,
  FaCrown,
  FaDownload,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { PlayerContext } from "../Context/PlayerContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { setIsSidebarOpen, searchQuery, setSearchQuery, getSearchData } =
    useContext(PlayerContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const dropdownRef = useRef(null);

  const isAdmin = user?.role === "admin";
  const isArtist = user?.role === "artist";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      const searchUrl = `/search?q=${encodeURIComponent(trimmedQuery)}`;

      // Avoid unnecessary navigation if query hasn't changed
      const currentQuery = new URLSearchParams(location.search).get("q");
      if (currentQuery === trimmedQuery && location.pathname === "/search") {
        return;
      }

      const shouldReplace = location.pathname === "/search";
      navigate(searchUrl, { replace: shouldReplace });

      getSearchData(trimmedQuery);
      
      console.log("Searching", trimmedQuery);

      setShowMobileSearch(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-zinc-800 text-white">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="lg:hidden p-2 rounded-full bg-black/50 border border-zinc-700 hover:bg-zinc-800 transition"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <FaBars size={18} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-black/50 border border-zinc-700 rounded-full w-8 h-8 hidden sm:flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer"
          >
            <FaArrowLeft size={14} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="bg-black/50 border border-zinc-700 rounded-full w-8 h-8 hidden sm:flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer"
          >
            <FaArrowRight size={14} />
          </button>
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden bg-black/50 border border-zinc-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-800 transition"
          >
            <FaSearch size={14} />
          </button>
          <div className="hidden md:flex items-center bg-zinc-800/50 border border-zinc-700 rounded-full px-3 py-1 w-48 lg:w-64">
            <FaSearch className="text-zinc-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent text-white placeholder-zinc-400 w-full outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isAdmin && !isArtist && (
            <>
              <button className="hidden sm:flex items-center gap-2 border border-zinc-600 px-3 py-1.5 rounded-full text-xs sm:text-sm hover:bg-zinc-700 hover:scale-105 transition">
                <FaDownload size={16} />
                <span className="hidden md:inline">Install App</span>
                <span className="md:hidden">App</span>
              </button>
            </>
          )}

          {isAdmin && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition cursor-pointer"
            >
              <FaCog size={16} />
              <span className="hidden sm:inline">Admin Panel</span>
              <span className="sm:hidden">Admin</span>
            </button>
          )}

          {isArtist && (
            <button
              onClick={() => navigate("/artist/dashboard")}
              className="bg-orange-600 hover:bg-orange-500 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition cursor-pointer"
            >
              <FaPalette size={16} />
              <span className="hidden sm:inline">Artist Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="User"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-purple-500 cursor-pointer"
              />
            ) : (
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
              >
                {user?.username?.[0]?.toUpperCase() || "G"}
              </button>
            )}

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-zinc-900 border border-zinc-700 rounded-xl p-3 z-50 animate-fade-in">
                <div className="flex items-center gap-3 border-b border-zinc-700 pb-3 mb-3">
                  {user?.profilePic ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.profilePic}
                      alt={user.username}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center rounded-full font-bold text-white">
                      {user?.username?.[0]?.toUpperCase() || "G"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {user?.username || "Guest"}
                    </h4>
                    <p className="text-xs text-zinc-400 truncate">
                      {user?.email || "guest@example.com"}
                    </p>
                  </div>
                </div>

                {user?.userId && (
                  <button
                    onClick={() => navigate(`/profile/${user.userId}`)}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm cursor-pointer"
                  >
                    <FaUser size={16} />
                    View Profile
                  </button>
                )}

                <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm">
                  <FaCog size={16} />
                  Settings
                </button>

                <div className="my-2 border-t border-zinc-700" />

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg text-sm"
                  >
                    <FaSignOutAlt size={16} />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-blue-400 hover:bg-blue-900/20 rounded-lg text-sm"
                  >
                    <FaSignInAlt size={16} />
                    Sign In
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 border-t border-zinc-800">
          <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-full px-3 py-2 mt-2">
            <FaSearch className="text-zinc-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent flex-1 text-sm text-white placeholder-zinc-400 outline-none"
              autoFocus
            />
            <button onClick={() => setShowMobileSearch(false)}>
              <FaTimes className="text-zinc-400 w-4 h-4 hover:text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="px-4 md:px-6 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {isAdmin &&
          ["dashboard", "user", "artist", "album"].map((tab) => (
            <button
              key={tab}
              onClick={() => navigate(`/admin/${tab}`)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap cursor-pointer ${
                isActive(`/admin/${tab}`)
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}

        {isArtist &&
          ["dashboard", "albums"].map((tab) => (
            <button
              key={tab}
              onClick={() => navigate(`/artist/${tab}`)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap cursor-pointer ${
                isActive(`/artist/${tab}`)
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
