
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
  if (userData) return;

  const token = localStorage.getItem("token");
  if (!token) return navigate("/login");

  try {
    const res = await axios.get(BASEURL + "/profile/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err.response?.status === 401) {
      navigate("/login");
    }
    console.error(err);
  }
};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
