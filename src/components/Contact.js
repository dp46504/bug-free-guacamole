import React from 'react'
import { Link } from 'react-router-dom'
import {
  FitBox,
  NavColumn,
  MainBody,
  StyledLink,
  BackgroundStyle,
  Title,
  colors,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Waves } from '../img/waves.svg'

export default function Contact(props) {
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
        <MainBody width='85%' height='50%' overflowY='hidden'>
          <Waves style={BackgroundStyle}></Waves>
          <Title height='10%'>Contact</Title>
          <FitBox height='90%' flexDirection='row'>
            <FitBox height='20%'>
              <Title width='50%' color={colors.lightGreen}>
                Email
              </Title>
              <Title width='50%' color={colors.lightGreen}>
                contact@clockman.com
              </Title>
            </FitBox>
            <FitBox height='20%'>
              <Title width='50%' color={colors.lightGreen}>
                Telephone
              </Title>
              <Title width='50%' color={colors.lightGreen}>
                210 003 754
              </Title>
            </FitBox>
          </FitBox>
        </MainBody>
      </FitBox>
    </>
  )
}
