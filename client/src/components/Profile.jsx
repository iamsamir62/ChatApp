import React from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Profile = () => {
  const { authUser } = useSelector((store) => store.user);
  return (
    <div className="w-[300px]">
      <div className="flex flex-col justify-center items-center">
        <img className="w-24 h-24" src={authUser.profilePhoto} alt="" />
        <div className="mt-2 mb-2">
          <h1>{authUser.fullName}</h1>
        </div>
      </div>
      <div className="flex gap-7 justify-center items-center">
        <button className="bg-gray-700 rounded-full p-2 hover:bg-gray-500 transition duration-200 flex items-center justify-center">
          <FaRegUserCircle className="text-white" size={20} />
        </button>
        <button className="bg-gray-700 rounded-full p-2 hover:bg-gray-500 transition duration-200 flex items-center justify-center">
          <IoMdNotificationsOutline className="text-white" size={20} />
        </button>
        <button className="bg-gray-700 rounded-full p-2 hover:bg-gray-500 transition duration-200 flex items-center justify-center">
          <CiSearch className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
