import React from "react";
import {
  FitBox,
  NavColumn,
  MainBody,
  StyledLink,
  BlobTopLeftStyle,
  BlobBottomRightStyle,
  Title,
  StyledForm,
  StyledInput,
  SubmitButton,
} from "./Style.js";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";
import { ReactComponent as BlobLeft } from "../img/blob_left_top.svg";
import { ReactComponent as BlobRight } from "../img/blob_right_down.svg";
import { useForm } from "react-hook-form";

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {};

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
        <MainBody width="85%">
          <Title height="30%">Log in</Title>
          <StyledForm justifyContent="center" onSubmit={handleSubmit(onSubmit)}>
            <StyledInput
              placeholder="E-mail"
              {...register("email", { required: true })}
            ></StyledInput>
            <StyledInput
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            ></StyledInput>
            <SubmitButton type="submit" value="Log in">
              Log in
            </SubmitButton>
          </StyledForm>
        </MainBody>

        <BlobLeft
          height="50%"
          preserveAspectRatio="none"
          style={BlobTopLeftStyle}
        ></BlobLeft>
        <BlobRight
          height="50%"
          preserveAspectRatio="none"
          style={BlobBottomRightStyle}
        ></BlobRight>
      </FitBox>
    </>
  );
}
