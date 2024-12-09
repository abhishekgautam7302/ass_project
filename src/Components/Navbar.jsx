import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../slice/authSlice";
import mainLogo from "../assets/1.png";

const Navbar = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md custom-shadow1-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={mainLogo} alt="Logo" className="h-10 w-auto object-contain" />
        </a>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-72 p-2 rounded-md bg-gray-700 border border-gray-500 text-white focus:ring focus:ring-blue-500"
          />
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidde bg-gray-800 bg-opacity-20 space-y-4 p-4">
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-500 text-white focus:ring focus:ring-blue-500"
          />
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
