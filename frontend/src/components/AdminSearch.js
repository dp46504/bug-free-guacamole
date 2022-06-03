import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  Title,
  DashboardBodyFlex,
  colors,
  SearchInput,
  ListItem,
  BackArrowStyle,
} from "./Style.js";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";
import { ReactComponent as Circles } from "../img/circle.svg";
import { ReactComponent as BackArrow } from "../img/back-arrow.svg";
import Roles from "../helpers/Roles";
import { endpoints } from "../variables";
import _ from "lodash";

export default function AdminSearch(props) {
  let history = useNavigate();
  const [users, setUsers] = useState([]);

  let debouncedSearch = _.debounce((searchValue) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        search: searchValue,
      }),
    };

    fetch(endpoints.admin_search, options)
      .then((JSONresult) => {
        if (!JSONresult.ok) return null;
        return JSONresult.json();
      })
      .then((result) => {
        if (result === null) {
          setUsers([]);
          return;
        }
        setUsers(result);
      });
  }, 500);

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
        <DashboardBodyFlex
          backgroundColor={`${colors.darkGreen}AA`}
          justifyContent="flex-start"
        >
          <Title color={colors.dirtyWhite} fontWeight="500" margin="2rem 0">
            Search
          </Title>
          <BackArrow
            style={BackArrowStyle}
            onClick={() => {
              history(-1);
            }}
          ></BackArrow>
          <SearchInput
            type="text"
            placeholder="Search here..."
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
          ></SearchInput>
          {users.length !== 0 &&
            users.map((userInfo, index) => {
              let time = userInfo.timeLeft
                ? new Date(
                    userInfo.timeLeft +
                      new Date(userInfo.timeLeft).getTimezoneOffset() *
                        60 *
                        1000
                  )
                    .toLocaleTimeString()
                    .slice(0, 5)
                : null;

              return (
                <ListItem
                  onClick={() => {
                    history(
                      `/user-info?uuid=${userInfo.uuid}&name=${userInfo.firstname}%20${userInfo.lastname}`
                    );
                  }}
                  key={index}
                >
                  <div
                    style={{ gridArea: "text1" }}
                  >{`${userInfo.firstname} ${userInfo.lastname}`}</div>
                  <div style={{ gridArea: "text2" }}>{userInfo.status}</div>

                  {time !== null && (
                    <div style={{ gridArea: "text3" }}>{time}</div>
                  )}
                  {time === null && (
                    <div style={{ gridArea: "text3" }}>--:--</div>
                  )}
                </ListItem>
              );
            })}
        </DashboardBodyFlex>
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
