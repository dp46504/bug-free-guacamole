import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  Title,
  DashboardBodyFlex,
  colors,
  BackArrowStyle,
  TimerCircle,
  TimerButton,
  StartStyle,
  StopStyle,
  BreakBox,
  BreakBoxInput,
  TimerInput,
  TimerDisplay,
} from "./Style.js";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";
import { ReactComponent as Circles } from "../img/circle.svg";
import { ReactComponent as BackArrow } from "../img/back-arrow.svg";
import { ReactComponent as Start } from "../img/start.svg";
import { ReactComponent as Stop } from "../img/stop.svg";
import { io } from "socket.io-client";
import Roles from "../helpers/Roles";
import variables from "../variables";

export default function UserDayView(props) {
  const [breaks, setBreaks] = useState({ break1: {}, break2: {} });
  const [workTime, setWorkTime] = useState("08:00");
  const [socket, setSocket] = useState(
    io.connect("http://localhost:5000", {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"),
      },
    })
  );
  const [isSet, setIsSet] = useState(false);
  const timerCircleRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = {
    day: searchParams.get("day"),
    month: searchParams.get("month"),
    year: searchParams.get("year"),
  };
  let timeLeft = 2000;

  const msToTime = (duration) => {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const startCountdown = () => {
    let interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
      timerCircleRef.current.innerText = msToTime(timeLeft);

      timeLeft -= 1000;
    }, 1000);
  };

  useEffect(() => {
    socket.emit("getTime", (response) => {
      if (response.data === null) {
        // There is no work registered for this day and for this user
        return null;
      }
      // Set UI and start countdown
      setIsSet(true);
      timeLeft = response.data.timeLeft;
      startCountdown();
    });
  }, []);

  const startTimer = () => {
    let data = {
      workTime: workTime,
      breaks: [{ ...breaks.break1 }, { ...breaks.break2 }],
    };
    // Submit start of a timer to backend

    fetch(variables.endpoints.start_workday, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        // Start the timer
        console.log("socketid: ", socket.id);
        socket.emit("getTime", (response) => {
          if (response.data === null) {
            // There is no work registered for this day and for this user
            return null;
          }
          // Set UI and start countdown
          timeLeft = response.data.timeLeft;
          setIsSet(true);
          console.log("before start countdown");
          startCountdown();
        });
      } else if (result.status === 403) {
        alert("Something went wrong with your credentials");
      } else if (result.status === 400) {
        alert("Work day already started");
      } else {
        alert("Something went wrong");
      }
      // 403 - bad token
      // 200 - ok
      // 400 - already registered task
      // 500 - all other
    });
  };

  return (
    <FitBox flexDirection="row">
      {/* Check Roles */}
      <Roles role="user"></Roles>
      {/* Navigation Menu */}
      <NavColumn width="15%">
        <FitBox height="20%" justifyContent="center">
          <MainLogo></MainLogo>
          <StyledLink to="/user">Clock Man</StyledLink>
        </FitBox>
        <StyledLink to="/user">Dashboard</StyledLink>
        <StyledLink to="/">Logout</StyledLink>
      </NavColumn>
      {/* Main body */}
      <FitBox>
        <Title height="12%">Dashboard</Title>
        <DashboardBodyFlex
          backgroundColor={`${colors.darkGreen}AA`}
          justifyContent="flex-start"
          flexDirection="row"
        >
          <BackArrow style={BackArrowStyle}></BackArrow>
          {/* Left side */}
          <FitBox width="50%">
            <Title color={colors.dirtyWhite} fontWeight="500" margin="4rem 0">
              DAY FORMAT
            </Title>
            <TimerCircle>
              {/* Conditional rendering input or display */}
              {isSet === false ? (
                <TimerInput
                  onChange={(event) => {
                    setWorkTime(event.target.value);
                  }}
                  value={workTime}
                ></TimerInput>
              ) : (
                <TimerDisplay ref={timerCircleRef}>loading...</TimerDisplay>
              )}
            </TimerCircle>
            <FitBox flexDirection="row" width="40%">
              <TimerButton>
                <Start
                  onClick={() => {
                    startTimer();
                  }}
                  style={StartStyle}
                  width="50%"
                  height="50%"
                ></Start>
              </TimerButton>
              <TimerButton>
                <Stop style={StopStyle} width="50%" height="50%"></Stop>
              </TimerButton>
            </FitBox>
          </FitBox>
          {/* Right Side */}
          <FitBox width="50%">
            <BreakBox>
              <Title style={{ gridArea: "breakIn" }} fontSize="2rem">
                Break In:{" "}
              </Title>
              <BreakBoxInput
                type="time"
                min="00:00"
                max="08:00"
                style={{ gridArea: "breakInTime" }}
                onChange={(event) => {
                  setBreaks((prev) => {
                    return {
                      ...prev,
                      break1: {
                        ...prev.break1,
                        breakIn: event.target.value,
                      },
                    };
                  });
                }}
              ></BreakBoxInput>
              <Title style={{ gridArea: "duration" }} fontSize="2rem">
                Duration:
              </Title>
              <BreakBoxInput
                type="number"
                min="5"
                max="30"
                style={{ gridArea: "durationTime" }}
                onChange={(event) => {
                  setBreaks((prev) => {
                    return {
                      ...prev,
                      break1: {
                        ...prev.break1,
                        breakTime: event.target.value,
                      },
                    };
                  });
                }}
              ></BreakBoxInput>
            </BreakBox>
            <BreakBox>
              <Title style={{ gridArea: "breakIn" }} fontSize="2rem">
                Break In:{" "}
              </Title>
              <BreakBoxInput
                type="time"
                min="00:00"
                max="08:00"
                style={{ gridArea: "breakInTime" }}
                onChange={(event) => {
                  setBreaks((prev) => {
                    return {
                      ...prev,
                      break2: {
                        ...prev.break2,
                        breakIn: event.target.value,
                      },
                    };
                  });
                }}
              ></BreakBoxInput>
              <Title style={{ gridArea: "duration" }} fontSize="2rem">
                Duration:
              </Title>
              <BreakBoxInput
                type="number"
                min="5"
                max="30"
                style={{ gridArea: "durationTime" }}
                onChange={(event) => {
                  setBreaks((prev) => {
                    return {
                      ...prev,
                      break2: {
                        ...prev.break2,
                        breakTime: event.target.value,
                      },
                    };
                  });
                }}
              ></BreakBoxInput>
            </BreakBox>
          </FitBox>
        </DashboardBodyFlex>
      </FitBox>
      <Circles
        style={CirclesStyle}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      ></Circles>
    </FitBox>
  );
}
