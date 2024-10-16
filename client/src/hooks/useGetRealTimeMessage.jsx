import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { useEffect } from "react";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages]);
};

export default useGetRealTimeMessage;
