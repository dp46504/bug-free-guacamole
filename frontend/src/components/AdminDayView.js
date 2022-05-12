import React, { useState } from 'react'
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
import variables from '../variables'

export default function AdminDayView(props) {
  let [usersInfo, setUsersInfo] = useState([])

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    body: JSON.stringify({
      day: 12,
      month: 5,
      year: 2022,
    }),
  }

  fetch(variables.endpoints.users_worktimes, options)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return alert('Something went wrong!')
      }
    })
    .then((data) => {
      if (data === null) {
        return alert('No data to fetch.')
      } else {
        setUsersInfo(data)
      }
    })

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
            DAY FORMAT
          </Title>
          <BackArrow style={BackArrowStyle}></BackArrow>
          <ListItem>
            <div style={{ gridArea: 'text1' }}>John Doe</div>
            <div style={{ gridArea: 'text2' }}>In Progress</div>
            <div style={{ gridArea: 'text3' }}>21:37:00</div>
          </ListItem>
        </DashboardBodyFlex>
      </FitBox>
      <Circles style={CirclesStyle}></Circles>
    </FitBox>
  )
}
