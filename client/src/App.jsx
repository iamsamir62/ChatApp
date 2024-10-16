import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import "./App.css";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/userSclice.js";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [Socketio, setSocketio] = useState(null);

  useEffect(() => {
    let socketInstance;

    if (authUser) {
      socketInstance = io("http://localhost:8080", {
        query: { userId: authUser._id }, // Pass userId as query
      });

      setSocketio(socketInstance);
      dispatch(setSocket(socketInstance));

      socketInstance?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketInstance.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        dispatch(setSocket(null));
      }
    };
  }, [authUser, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage socket={Socketio} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
