import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/FeedSlice";
import { setSearchResults, clearSearchResults } from "../utils/SearchSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const search = useSelector((store) => store.search);
  const [searchTerm, setSearchTerm] = useState("");

  // const getFeed = async () => {
  //   if (feed && feed.length > 0) return;
  //   try {
  //     const res = await axios.get(BASEURL + "/feed", {
  //       withCredentials: true,
  //     });
  //     dispatch(addFeed(res?.data?.data));
  //   } catch (err) {
  //     console.log("Feed fetch error:", err);
  //   }
  // };
  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const token = localStorage.getItem("token"); // get JWT from storage
      const res = await axios.get(BASEURL + "/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log("Feed fetch error:", err.response?.data || err.message);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      dispatch(clearSearchResults());
      return;
    }

    try {
      const res = await axios.get(BASEURL + `/search?name=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      dispatch(setSearchResults(res?.data?.data || []));
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleAction = (userId) => {
    if (search.length > 0) {
      dispatch(clearSearchResults());
    } else {
      dispatch(removeUserFromFeed(userId));
    }
  };

  const userToShow =
    search?.length > 0 && search[0]?._id ? search[0] : feed?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-pink-900 px-4 py-6 sm:py-10">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 sm:mb-10 w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search developers..."
          className="w-full px-4 py-3 rounded-lg text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg transition-all"
        >
          🔍 Search
        </button>
      </div>

      {/* User Display */}
      {userToShow && userToShow._id ? (
        <div className="flex justify-center items-center px-2">
          <div className="w-full sm:max-w-xl">
            <UserCard user={userToShow} onAction={handleAction} />
          </div>
        </div>
      ) : (
        <h1 className="text-center text-lg sm:text-xl font-medium text-white/80 mt-10">
          No developers found!
        </h1>
      )}
    </div>
  );
};

export default Feed;
