import React from "react";
import {
  FitBox,
  NavColumn,
  MainBody,
  StyledLink,
  WaveStyle,
  Title,
  colors,
} from "./Style.js";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";
import { ReactComponent as Waves } from "../img/waves.svg";

export default function Contact(props) {
  return (
    <>
      <FitBox flexDirection="row">
        {/* Navigation Menu */}
        <NavColumn width="15%">
          <FitBox height="20%" justifyContent="center">
            <MainLogo></MainLogo>
            <StyledLink to="/">Clock Man</StyledLink>
          </FitBox>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/login">Log in</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </NavColumn>
        {/* Main body */}
        <MainBody width="85%" height="50%" overflowY="hidden">
          <Waves style={WaveStyle}></Waves>
          <Title height="10%">Contact</Title>
          <FitBox height="90%" wrap="wrap" flexDirection="row">
            <FitBox height="20%" width="fit-content">
              <Title width="50%" color={colors.lightGreen}>
                Email
              </Title>
              <Title width="50%" color={colors.lightGreen}>
                contact@clockman.com
              </Title>
            </FitBox>

            <FitBox height="20%" width="fit-content">
              <Title width="50%" color={colors.lightGreen}>
                Telephone
              </Title>
              <Title width="100%" color={colors.lightGreen}>
                214 203 769
              </Title>
            </FitBox>
          </FitBox>
        </MainBody>
      </FitBox>
    </>
  );
}
