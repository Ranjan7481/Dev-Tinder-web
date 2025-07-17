import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import axios from "axios";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Premium from "./components/Premium";
import ChangePassword from "./components/ChangePassword";
function App() {
  return (
    <>
      <Provider store={appStore}>
  <BrowserRouter basename="/">
    <Routes>
      {/* Redirect root ("/") to "/home" */}
      <Route path="/" element={<Navigate to="/home" />} />
      
      {/* Define /home route */}
      <Route path="/home" element={<Home />} />

      {/* Nested routes inside Body */}
      <Route path="/" element={<Body />}>
      <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
    </>
  );
}

export default App;
