import React from 'react'
import { FitBox, NavColumn, StyledLink, CirclesStyle } from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Circles } from '../img/circle.svg'

export default function UserDayView(props) {
  return (
    <FitBox flexDirection='row'>
      {/* Navigation Menu */}
      <NavColumn width='15%'>
        <FitBox height='20%' justifyContent='center'>
          <MainLogo></MainLogo>
          <StyledLink to='/user'>Clock Man</StyledLink>
        </FitBox>
        <StyledLink to='/user'>Dashboard</StyledLink>
        <StyledLink to='/'>Logout</StyledLink>
      </NavColumn>
      {/* Main body */}
      <Circles style={CirclesStyle}></Circles>
    </FitBox>
  )
}
