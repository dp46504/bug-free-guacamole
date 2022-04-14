import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as BlobLeft } from '../img/blob_left_top.svg'
import { ReactComponent as BlobRight } from '../img/blob_right_down.svg'
import { endpoints } from '../variables.js'

export default function Login(props) {
  const { register, handleSubmit } = useForm()

  let history = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('role')) {
      history(
        `/${localStorage.getItem('role') === 'user' ? 'user' : 'administrator'}`
      )
    }
  }, [])

  const onSubmit = async (data) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }

    fetch(endpoints.login, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return alert('Login failed.')
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('role', data.info.role)
        // Jestem BigMommy robie BigMoney
        history(`/${data.info.role === 'user' ? 'user' : 'administrator'}`)
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
          <Title height='30%'>Log in</Title>
          <StyledForm justifyContent='center' onSubmit={handleSubmit(onSubmit)}>
            <StyledInput
              placeholder='E-mail'
              {...register('email', { required: true })}></StyledInput>
            <StyledInput
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}></StyledInput>
            <SubmitButton type='submit' value='Submit'>
              Log in
            </SubmitButton>
          </StyledForm>
        </MainBody>

        <BlobLeft
          height='50%'
          preserveAspectRatio='none'
          style={BlobTopLeftStyle}></BlobLeft>
        <BlobRight
          height='50%'
          preserveAspectRatio='none'
          style={BlobBottomRightStyle}></BlobRight>
      </FitBox>
    </>
  )
}
