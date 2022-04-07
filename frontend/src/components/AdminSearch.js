import React from 'react'
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  Title,
  DashboardBodyFlex,
  colors,
  SearchInput,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Circles } from '../img/circle.svg'

export default function AdminSearch(props) {
  return (
    <FitBox flexDirection='row'>
      {/* Navigation Menu */}
      <NavColumn width='15%'>
        <FitBox height='20%' justifyContent='center'>
          <MainLogo></MainLogo>
          <StyledLink to='/administrator'>Clock Man</StyledLink>
        </FitBox>
        <StyledLink to='/administrator'>Dashboard</StyledLink>
        <StyledLink to='/search'>Search</StyledLink>
        <StyledLink to='/'>Logout</StyledLink>
      </NavColumn>
      {/* Main body */}
      <FitBox>
        <Title height='12.5%'>Administrator</Title>
        <DashboardBodyFlex backgroundColor={`${colors.darkGreen}AA`}>
          <SearchInput type='text'></SearchInput>
        </DashboardBodyFlex>
      </FitBox>
      <Circles style={CirclesStyle}></Circles>
    </FitBox>
  )
}
