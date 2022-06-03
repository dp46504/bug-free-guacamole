import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  DayNameLabel,
  MonthBubble,
  MonthGrid,
  Title,
  colors,
  BackArrowStyle,
} from "./Style.js";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";
import { ReactComponent as BackArrow } from "../img/back-arrow.svg";
import { ReactComponent as Circles } from "../img/circle.svg";
import Roles from "../helpers/Roles";
import getCalendarInfo from "../helpers/getCalendarInfo";

export default function AdminDashboard(props) {
  let [dayData, setDayData] = useState([]);
  let history = useNavigate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    getCalendarInfo(setDayData);
  }, []);

  return (
    <FitBox flexDirection="row">
      {/* Check Roles */}
      <Roles role="admin"></Roles>
      {/* Navigation Menu */}
      <NavColumn width="15%">
        <FitBox height="20%" justifyContent="center">
          <MainLogo></MainLogo>
          <StyledLink to="/administrator">Clock Man</StyledLink>
        </FitBox>
        <StyledLink to="/administrator">Dashboard</StyledLink>
        <StyledLink to="/search">Search</StyledLink>
        <StyledLink
          to="/"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </StyledLink>
      </NavColumn>
      {/* Main body */}
      <FitBox>
        <Title height="12%">Administrator</Title>
        <FitBox
          style={{
            backgroundColor: `${colors.darkGreen}AA`,
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <Title color="white">{monthNames[new Date().getMonth()]}</Title>

          <MonthGrid>
            <DayNameLabel>Mon</DayNameLabel>
            <DayNameLabel>Tue</DayNameLabel>
            <DayNameLabel>Wed</DayNameLabel>
            <DayNameLabel>Thu</DayNameLabel>
            <DayNameLabel>Fri</DayNameLabel>
            <DayNameLabel>Sat</DayNameLabel>
            <DayNameLabel>Sun</DayNameLabel>
            {dayData.map((dayInfo) => {
              const isToday =
                new Date().getDate() === dayInfo.number &&
                dayInfo.month !== -1 &&
                dayInfo.month !== 1
                  ? true
                  : false;
              let textColor = null;
              let bckgColor = null;
              switch (isToday) {
                case true:
                  textColor = colors.dirtyWhite;
                  bckgColor = colors.maron;
                  break;
                case false:
                  bckgColor = colors.dirtyWhite;
                  textColor =
                    dayInfo.month === -1 || dayInfo.month === 1
                      ? "gray"
                      : colors.darkGreen;
                  break;
                default:
                  bckgColor = colors.dirtyWhite;
                  textColor = colors.darkGreen;
              }
              const day = dayInfo.number;
              const month = dayInfo.monthNumber + 1;
              const year = dayInfo.year;
              return (
                <MonthBubble
                  isToday={isToday}
                  admin={true}
                  onClick={() => {
                    history(`/day-info?day=${day}&month=${month}&year=${year}`);
                  }}
                  backgroundColor={bckgColor}
                  color={textColor}
                >
                  {dayInfo.number}
                </MonthBubble>
              );
            })}
          </MonthGrid>
        </FitBox>
      </FitBox>
      <Circles
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={CirclesStyle}
      ></Circles>
    </FitBox>
  );
}
