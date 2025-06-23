import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constant";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 relative transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          {isLoginForm ? "Welcome Back 👋" : "Create Your Account"}
        </h2>
        <form className="space-y-5">
          {!isLoginForm && (
            <>
              <div className="flex items-center bg-gray-800/60 px-3 py-2 rounded-xl border border-gray-700">
                <User className="text-white mr-2" size={18} />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-transparent w-full outline-none text-white placeholder-gray-300"
                />
              </div>
              <div className="flex items-center bg-gray-800/60 px-3 py-2 rounded-xl border border-gray-700">
                <User className="text-white mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-transparent w-full outline-none text-white placeholder-gray-300"
                />
              </div>
            </>
          )}

          <div className="flex items-center bg-gray-800/60 px-3 py-2 rounded-xl border border-gray-700">
            <Mail className="text-white mr-2" size={18} />
            <input
              type="text"
              placeholder="Email Address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="bg-transparent w-full outline-none text-white placeholder-gray-300"
            />
          </div>

          <div className="flex items-center bg-gray-800/60 px-3 py-2 rounded-xl border border-gray-700">
            <Lock className="text-white mr-2" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full outline-none text-white placeholder-gray-300"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-medium text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>

        <p
          className="mt-6 text-center text-sm text-white/80 hover:text-white cursor-pointer transition"
          onClick={() => setIsLoginForm((prev) => !prev)}
        >
          {isLoginForm
            ? "Don't have an account? Sign up here"
            : "Already a user? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
