import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASEURL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-md">
      <div className="flex-1">
        <button
          onClick={() => navigate(user ? "/feed" : "/home")}
          className="btn btn-ghost text-2xl font-bold hover:text-yellow-300 transition-all"
        >
          👩‍💻 Connect Hub
        </button>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <div className="text-white font-semibold mr-4">
            Welcome, {user.firstName}
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-white">
                <img alt="user avatar" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box shadow-lg mt-3 w-52 p-2 z-50"
            >
              <li>
                <Link to="/profile" className="hover:bg-cyan-100 rounded-md p-2">
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-cyan-100 rounded-md p-2">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-cyan-100 rounded-md p-2">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="hover:bg-cyan-100 rounded-md p-2">
                  Premium
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="hover:bg-red-100 text-red-600 rounded-md p-2 cursor-pointer"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
