import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";
import { BASEURL } from "../utils/constant";
import { motion } from "framer-motion";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
       const token = localStorage.getItem("token");
    const res = await axios.get(BASEURL + "/user/connections", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-white text-2xl mt-20">
        No Connections Found
      </h1>
    );

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c]">
      <h1 className="text-center text-4xl font-bold text-white mb-12 drop-shadow-lg">
        Your Connections
      </h1>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex items-center gap-6 p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 text-white border border-purple-700 hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                alt="User"
                src={photoUrl || "/default-avatar.png"}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-semibold">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-purple-200">{age}, {gender}</p>
                )}
                <p className="text-sm text-gray-300 mt-1 line-clamp-3">{about}</p>
              </div>
              <Link to={`/chat/${_id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200"
                >
                  Chat
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
