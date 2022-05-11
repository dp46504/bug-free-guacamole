import React from 'react'
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  Title,
  DashboardBodyFlex,
  colors,
  ListItem,
  BackArrowStyle,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Circles } from '../img/circle.svg'
import { ReactComponent as BackArrow } from '../img/back-arrow.svg'
import Roles from '../helpers/Roles'

export default function AdminInspectUser(props) {
  return (
    <FitBox flexDirection='row'>
      {/* Check Roles */}
      <Roles role='admin'></Roles>
      {/* Navigation Menu */}
      <NavColumn width='15%'>
        <FitBox height='20%' justifyContent='center'>
          <MainLogo></MainLogo>
          <StyledLink to='/administrator'>Clock Man</StyledLink>
        </FitBox>
        <StyledLink to='/administrator'>Dashboard</StyledLink>
        <StyledLink to='/search'>Search</StyledLink>
        <StyledLink
          to='/'
          onClick={() => {
            localStorage.clear()
          }}>
          Logout
        </StyledLink>
      </NavColumn>
      {/* Main body */}
      <FitBox>
        <Title height='12%'>Administrator</Title>
        <DashboardBodyFlex
          backgroundColor={`${colors.darkGreen}AA`}
          justifyContent='flex-start'>
          <Title color={colors.dirtyWhite} fontWeight='500' margin='2rem 0'>
            USERNAME
          </Title>
          <BackArrow style={BackArrowStyle}></BackArrow>
          <ListItem>
            <div style={{ gridArea: 'text1' }}>11.09.2002</div>
            <div style={{ gridArea: 'text2' }}>Done</div>
            <div style={{ gridArea: 'text3' }}>7:00:00</div>
          </ListItem>
        </DashboardBodyFlex>
      </FitBox>
      <Circles style={CirclesStyle}></Circles>
    </FitBox>
  )
}
