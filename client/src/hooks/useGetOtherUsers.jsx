import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilteredUsers, setOtherUsers } from "../redux/userSclice.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/user/`);
        console.log(res);
        dispatch(setOtherUsers(res.data));
        dispatch(setFilteredUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
