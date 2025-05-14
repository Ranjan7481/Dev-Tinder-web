import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./conectionSlice";
import requestReducer from "./requestSlice";
import searchReducer from "./SearchSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    search: searchReducer,


  },
});
export default appStore;