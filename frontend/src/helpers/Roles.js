import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Roles(props) {
  let history = useNavigate();
  useEffect(() => {
    // const socket = io.connect("http://localhost:5000", {
    //   transports: ["websocket"],
    //   auth: {
    //     token: props.token,
    //   },
    // });

    // socket.on("connect", () => {
    //   console.log("connected");
    // });

    // socket.emit("getTime");

    // socket.on("sendTimeData", (data) => {
    //   console.log(data);
    // });

    // socket.on('connect_error', (err) => {
    //   console.log(err)
    // })

    // fetch("http://localhost:5000/api/start-workday", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${props.token}`,
    //   },
    //   body: JSON.stringify({
    //     workTime: "05:00",
    //     breaks: [
    //       {
    //         breakIn: "02:00",
    //         breakTime: 10,
    //       },
    //       {
    //         breakIn: "04:00",
    //         breakTime: 15,
    //       },
    //     ],
    //   }),
    // });

    if (
      localStorage.getItem("role") === null ||
      localStorage.getItem("role") !== props.role
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      history("/login");
    }
  }, []);
  return <></>;
}
