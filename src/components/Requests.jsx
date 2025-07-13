import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASEURL } from "../utils/constant";
import { motion } from "framer-motion";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
        const token = localStorage.getItem("token");

    await axios.post(
      BASEURL + "/request/review/" + status + "/" + _id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
       const token = localStorage.getItem("token");

    const res = await axios.get(BASEURL + "/user/requests/received", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-white text-2xl mt-20">
        No Requests Found
      </h1>
    );

  // return (
  //   <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c]">
  //     <motion.h1
  //       initial={{ opacity: 0, y: -20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.6 }}
  //       className="text-center text-4xl font-bold text-white mb-12 drop-shadow-lg"
  //     >
  //       Connection Requests
  //     </motion.h1>

  //     <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 max-w-5xl mx-auto">
  //       {requests.map((request, index) => {
  //         const { _id, firstName, lastName, photoUrl, age, gender, about } =
  //           request.fromUserId;

  //         return (
  //           <motion.div
  //             key={_id}
  //             initial={{ opacity: 0, y: 40 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.6, delay: index * 0.1 }}
  //             className="flex items-center gap-6 p-6 justify-center rounded-2xl bg-gradient-to-r from-[#6a3093] to-[#a044ff] text-white shadow-lg border border-purple-700 hover:shadow-purple-500/40 hover:scale-[1.02] transition duration-300 relative"
  //           >
  //             <img
  //               alt="User"
  //               src={photoUrl || "/default-avatar.png"}
  //               className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
  //             />
  //             <div className="flex-1">
  //               <h2 className="text-xl font-semibold">
  //                 {firstName} {lastName}
  //               </h2>
  //               {age && gender && (
  //                 <p className="text-sm text-purple-200">{age}, {gender}</p>
  //               )}
  //               <p className="text-sm text-gray-200 mt-1 line-clamp-3">{about}</p>
  //             </div>
  //             <div className="flex flex-col gap-2">
  //               <motion.button
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 onClick={() => reviewRequest("rejected", request._id)}
  //                 className="px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600"
  //               >
  //                 Reject
  //               </motion.button>
  //               <motion.button
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 onClick={() => reviewRequest("accepted", request._id)}
  //                 className="px-4 py-2 rounded-full bg-green-500 text-white font-medium shadow hover:bg-green-600"
  //               >
  //                 Accept
  //               </motion.button>
  //             </div>
  //           </motion.div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold text-white mb-12 drop-shadow-lg"
      >
        Connection Requests
      </motion.h1>
  
      <div className="flex flex-col items-center gap-8">
        {requests.map((request, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
  
          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full max-w-2xl flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-[#6a3093] to-[#a044ff] text-white shadow-lg border border-purple-700 hover:shadow-purple-500/40 hover:scale-[1.02] transition duration-300"
            >
              <img
                alt="User"
                src={photoUrl || "/default-avatar.png"}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-purple-200">{age}, {gender}</p>
                )}
                <p className="text-sm text-gray-200 mt-1 line-clamp-3">{about}</p>
              </div>
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600"
                >
                  Reject
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-4 py-2 rounded-full bg-green-500 text-white font-medium shadow hover:bg-green-600"
                >
                  Accept
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
  

};

export default Requests;
