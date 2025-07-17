import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL } from "../utils/constant";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
 

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.post(
        BASEURL + "/resetPassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          navigate("/feed");
        }, 1500);
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update password";
      toast.error(message);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-white p-4"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <button
            onClick={() => navigate("/feed")}
            className="text-[#111418] flex size-10 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h2 className="text-[#111418] text-lg font-bold text-center flex-1 pr-10">
            Change Password
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <p className="text-[#111418] font-medium pb-2">Email</p>
            <input
              type="email"
              placeholder={user.data.emailId}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 rounded-lg bg-[#f0f2f5] p-4 text-[#111418] placeholder:text-[#60758a] focus:outline-none"
            />
          </div>

          {/* Old Password */}
          <div className="relative">
            <p className="text-[#111418] font-medium pb-2">Old Password</p>
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full h-14 rounded-lg bg-[#f0f2f5] p-4 pr-12 text-[#111418] placeholder:text-[#60758a] focus:outline-none"
            />
            <span
              className="absolute top-[53px] right-4 cursor-pointer text-gray-500"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <p className="text-[#111418] font-medium pb-2">New Password</p>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-14 rounded-lg bg-[#f0f2f5] p-4 pr-12 text-[#111418] placeholder:text-[#60758a] focus:outline-none"
            />
            <span
              className="absolute top-[53px] right-4 cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6">
          <button
            onClick={handleUpdatePassword}
            className="w-full h-12 bg-[#3d98f4] text-white font-bold rounded-lg hover:bg-[#2575d0] transition"
          >
            Update Password
          </button>
        </div>

        {/* Toast */}
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ChangePassword;
