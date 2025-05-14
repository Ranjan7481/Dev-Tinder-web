import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/FeedSlice";
import {
  setSearchResults,
  clearSearchResults,
} from "../utils/SearchSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const search = useSelector((store) => store.search); // Array of searched users
  const [searchTerm, setSearchTerm] = useState("");

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASEURL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log("Feed fetch error:", err);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      dispatch(clearSearchResults());
      return;
    }

    try {
      const res = await axios.get(BASEURL + `/search?name=${searchTerm}`, {
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
    <div className="my-10">
      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          className="px-4 py-2 border rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* UserCard Display */}
      {userToShow && userToShow._id ? (
        <div className="flex justify-center">
          <UserCard user={userToShow} onAction={handleAction} />
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold text-gray-600">
          No users found!
        </h1>
      )}
    </div>
  );
};

export default Feed;
