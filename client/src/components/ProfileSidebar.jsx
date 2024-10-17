import React, { useState } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import Otherusers from "./Otherusers";
import Profile from "./Profile";
import {
  setAuthUser,
  setFilteredUsers,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSclice.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProfileSidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    // Handle search submission
  };

  const clearSearch = () => {
    setSearch("");
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.error(error);
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <div className="border-l border-slate-500 p-4 flex flex-col">
      <Profile />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
