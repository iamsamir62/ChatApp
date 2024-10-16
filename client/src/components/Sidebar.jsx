import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setFilteredUsers,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSclice.js";
import Otherusers from "./Otherusers.jsx";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { filterUsers, otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = filterUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (search === "") {
      dispatch(setFilteredUsers(otherUsers));
    } else if (conversationUser) {
      dispatch(setFilteredUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };

  const clearSearch = () => {
    setSearch("");
    dispatch(setFilteredUsers(otherUsers));
  };

  const allUsersHandler = (e) => {
    e.preventDefault();
    dispatch(setOtherUsers(otherUsers));
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md flex-1"
          type="text"
          placeholder="Search..."
        />
        {/* Clear Button */}
        {search && (
          <button type="button" onClick={clearSearch} className="ml-2">
            <BiX className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        )}
        <button type="submit" className="btn bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <Otherusers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
