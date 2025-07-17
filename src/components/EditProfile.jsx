import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Changed to react-router-dom's Link

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError(""); // Clear previous errors
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        BASEURL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500 py-10">
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <div className="card bg-base-300 w-full shadow-xl p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Edit Profile</h2>

          <div className="space-y-6 flex flex-col items-center">
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">First Name:</span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered input-lg w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">Last Name:</span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered input-lg w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">Photo URL:</span>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered input-lg w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">Age:</span>
              <input
                type="number"
                value={age}
                className="input input-bordered input-lg w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">Gender:</span>
              <select
                value={gender}
                className="select select-bordered input-lg w-full"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text text-white">About:</span>
              <textarea
                value={about}
                className="textarea textarea-bordered input-lg w-full"
                rows="4"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>
          </div>

          {error && <p className="text-red-500 text-center text-lg mt-4">{error}</p>}

          <div className="card-actions flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <button
              className="btn btn-lg btn-secondary transform hover:scale-105 transition-all duration-300"
              onClick={saveProfile}
            >
              Save Profile
            </button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/changepassword"
                className="btn btn-outline btn-accent btn-lg"
              >
                Change Password
              </Link>
            </motion.div>
          </div>
        </div>

        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="toast toast-top toast-center z-50"
          >
            <div className="alert alert-success">
              <span>Profile saved successfully!</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
