import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
      <div className="flex h-[500px] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default HomePage;
