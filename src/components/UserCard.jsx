import { useDispatch } from "react-redux";
import { BASEURL } from "../utils/constant";
import { motion } from "framer-motion";
import { X, Heart } from "react-feather";
import axios from "axios";

const UserCard = ({ user, onAction }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASEURL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      onAction(_id); // Inform Feed component to remove user
    } catch (err) {
      console.error("Request send error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-300 w-96 shadow-xl rounded-3xl overflow-hidden"
    >
      <figure>
        <img
          src={photoUrl || "/default-avatar.png"}
          alt="User"
          className="w-full h-80 object-cover"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-lg text-gray-700">
            {age}, {gender}
          </p>
        )}
        {about && <p className="text-base text-gray-600">{about}</p>}

        <div className="card-actions justify-center my-4 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("ignore")}
            className="p-4 rounded-full bg-white shadow-lg"
          >
            <X className="w-8 h-8 text-rose-500" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("interested")}
            className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
