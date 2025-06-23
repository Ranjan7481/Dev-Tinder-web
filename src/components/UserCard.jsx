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
      onAction(_id);
    } catch (err) {
      console.error("Request send error:", err);
    }
  };

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
      }}
      className="w-full  h-screen max-w-sm sm:max-w-md bg-base-300 shadow-xl rounded-3xl overflow-hidden mx-auto"
    >
      <motion.figure
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={photoUrl || "/default-avatar.png"}
          alt="User"
          className="w-full h-64 sm:h-80 object-cover"
        />
      </motion.figure>

      <div className="card-body px-4 py-6 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-200">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm sm:text-lg text-gray-400">
            {age}, {gender}
          </p>
        )}
        {about && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-gray-400 mt-2"
          >
            {about}
          </motion.p>
        )}

        <div className="mt-6 flex justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("ignore")}
            className="p-3 sm:p-4 rounded-full bg-white shadow-lg"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("interested")}
            className="p-3 sm:p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
