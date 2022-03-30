import React from 'react'
import {
  FitBox,
  NavColumn,
  MainBody,
  StyledLink,
  BlobTopRightStyle,
  BlobBottomLeftStyle,
  Title,
  StyledForm,
  StyledInput,
  SubmitButton,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as BlobLeft } from '../img/blob_left_down.svg'
import { ReactComponent as BlobRight } from '../img/blob_right_top.svg'
import { useForm } from 'react-hook-form'
import { endpoints } from '../variables.js'

export default function Register(props) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    if (data.password1 !== data.password2) {
      return alert('Password mismatch.')
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
      }),
    }

    fetch(endpoints.register, options).then((response) => {
      if (response.ok) {
        return alert('Registration successful.')
      } else {
        return alert('Registration failed.')
      }
    })
  }

  return (
    <>
      <FitBox flexDirection='row'>
        {/* Navigation Menu */}
        <NavColumn width='15%'>
          <FitBox height='20%' justifyContent='center'>
            <MainLogo></MainLogo>
            <StyledLink to='/'>Clock Man</StyledLink>
          </FitBox>
          <StyledLink to='/'>Home</StyledLink>
          <StyledLink to='/login'>Log in</StyledLink>
          <StyledLink to='/register'>Register</StyledLink>
          <StyledLink to='/contact'>Contact</StyledLink>
        </NavColumn>
        {/* Main body */}
        <MainBody width='85%'>
          <BlobLeft
            height='50%'
            preserveAspectRatio='none'
            style={BlobBottomLeftStyle}></BlobLeft>
          <BlobRight
            height='50%'
            preserveAspectRatio='none'
            style={BlobTopRightStyle}></BlobRight>
          <Title height='30%'>Register</Title>
          <StyledForm justifyContent='center' onSubmit={handleSubmit(onSubmit)}>
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
              {...register('password1', { required: true })}></StyledInput>
            <StyledInput
              type='password'
              placeholder='Confirm password'
              {...register('password2', { required: true })}></StyledInput>
            <SubmitButton type='submit' value='Register'>
              Register
            </SubmitButton>
          </StyledForm>
        </MainBody>
      </FitBox>
    </>
  )
}
