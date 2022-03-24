import React from 'react'
import { Link } from 'react-router-dom'
import {
  FitBox,
  NavColumn,
  MainBody,
  StyledLink,
  BackgroundStyle,
  BackgroundStyle2,
  Title,
  StyledForm,
  StyledInput,
  SubmitButton,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as BlobLeft } from '../img/blob_left_down.svg'
import { ReactComponent as BlobRight } from '../img/blob_right_top.svg'
import { useForm } from 'react-hook-form'

export default function Register(props) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {}

  return (
    <>
      <FitBox flexDirection='row'>
        {/* Navigation Menu */}
        <NavColumn width='15%'>
          <FitBox height='20%' justifyContent='center'>
            <MainLogo></MainLogo>
            <Link to='/' style={StyledLink}>
              Clock Man
            </Link>
          </FitBox>
          <Link to='/' style={StyledLink}>
            Home
          </Link>
          <Link to='/login' style={StyledLink}>
            Log in
          </Link>
          <Link to='/register' style={StyledLink}>
            Register
          </Link>
          <Link to='/contact' style={StyledLink}>
            Contact
          </Link>
        </NavColumn>
        {/* Main body */}
        <MainBody width='85%'>
          <BlobLeft style={BackgroundStyle}></BlobLeft>
          <BlobRight style={BackgroundStyle2}></BlobRight>
          <Title>Register</Title>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledInput
              placeholder='E-mail'
              {...register('email', { required: true })}></StyledInput>
            <StyledInput
              placeholder='Firstname'
              {...register('firstname', { required: true })}></StyledInput>
            <StyledInput
              placeholder='Lastname'
              {...register('lastname', { required: true })}></StyledInput>
            <StyledInput
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}></StyledInput>
            <StyledInput
              type='password'
              placeholder='Confirm password'
              {...register('password', { required: true })}></StyledInput>
            <SubmitButton type='submit' value='Log in'>
              Log in
            </SubmitButton>
          </StyledForm>
        </MainBody>
      </FitBox>
    </>
  )
}
