import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) {
        setLoading(false);
        setError("No user selected");
        return;
      }

      try {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/message/${selectedUser._id}`
        );
        console.log("Message is", res.data);

        dispatch(setMessages(res.data));
        setLoading(false);
      } catch (err) {
        setError("Failed to load messages");
        console.error(err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  return { loading, error };
};

export default useGetMessages;
