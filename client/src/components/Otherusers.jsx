import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers, filterUsers } = useSelector((store) => store.user);

  if (!otherUsers && !filterUsers) return null;

  const usersToDisplay = filterUsers?.length > 0 ? filterUsers : otherUsers;

  return (
    <div className="overflow-auto flex-1">
      {usersToDisplay?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
