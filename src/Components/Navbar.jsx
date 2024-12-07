
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../slice/authSlice";
import mainLogo from "../assets/1.png";

const Navbar = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
         <a href="/">
         <img src={mainLogo} alt="Logo" className="h-[50px] w-[180px] object-contain" />
         </a>
        </div>

        {/* Middle: Search Box */}
        <div className="flex flex-grow justify-center">
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-96 p-2 rounded-md border border-gray-500 bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
