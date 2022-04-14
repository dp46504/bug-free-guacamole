import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  DayNameLabel,
  MonthBubble,
  MonthGrid,
  Title,
  colors,
} from './Style.js'

import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Circles } from '../img/circle.svg'
import Roles from '../helpers/Roles'

export default function UserDashboard(props) {
  let history = useNavigate()

  useEffect(() => {
    let dayArr = []
    let daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate()

    let daysInPreviousMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).getDate()

    let daysOfThePreviousMonthToAdd =
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1

    let daysOfTheNextMonthToAdd =
      (new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        1
      ).getDay() +
        1) %
      7

    // Adding previous month days to array
    for (let i = daysOfThePreviousMonthToAdd; i > 0; i--) {
      dayArr.push({
        number: daysInPreviousMonth - i + 1,
        month: -1,
        monthNumber: new Date().getMonth() - 1,
        year: new Date().getFullYear(),
      })
    }
    // Adding actual month days to array
    for (let i = 1; i <= daysInMonth; i++) {
      dayArr.push({
        number: i,
        month: 0,
        monthNumber: new Date().getMonth(),
        year: new Date().getFullYear(),
      })
    }
    // Adding next month days to array
    for (let i = 1; i <= daysOfTheNextMonthToAdd; i++) {
      dayArr.push({
        number: i,
        month: 1,
        monthNumber: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    }

    setDayData(dayArr)
  }, [])

  let [dayData, setDayData] = useState([])
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <FitBox flexDirection='row'>
      {/* Check Roles */}
      <Roles role='user'></Roles>
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
      <FitBox>
        <Title height='12%'>User</Title>
        <FitBox
          style={{
            backgroundColor: `${colors.darkGreen}AA`,
            overflowX: 'hidden',
            position: 'relative',
          }}>
          <Title color='white'>{monthNames[new Date().getMonth()]}</Title>

          <MonthGrid>
            <DayNameLabel>Mon</DayNameLabel>
            <DayNameLabel>Tue</DayNameLabel>
            <DayNameLabel>Wed</DayNameLabel>
            <DayNameLabel>Thu</DayNameLabel>
            <DayNameLabel>Fri</DayNameLabel>
            <DayNameLabel>Sat</DayNameLabel>
            <DayNameLabel>Sun</DayNameLabel>
            {dayData.map((dayInfo) => {
              const isToday =
                new Date().getDate() === dayInfo.number ? true : false
              let textColor = null
              let bckgColor = null
              switch (isToday) {
                case true:
                  textColor = colors.dirtyWhite
                  bckgColor = colors.maron
                  break
                case false:
                  bckgColor = colors.dirtyWhite
                  textColor =
                    dayInfo.month === -1 || dayInfo.month === 1
                      ? 'gray'
                      : colors.darkGreen
                  break
                default:
                  bckgColor = colors.dirtyWhite
                  textColor = colors.darkGreen
              }
              const day = dayInfo.number
              const month = dayInfo.monthNumber
              const year = dayInfo.year
              return (
                <MonthBubble
                  onClick={() => {
                    history(`/timer?day=${day}&month=${month}&year=${year}`)
                  }}
                  backgroundColor={bckgColor}
                  color={textColor}>
                  {dayInfo.number}
                </MonthBubble>
              )
            })}
          </MonthGrid>
        </FitBox>
      </FitBox>
      <Circles
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid slice'
        style={CirclesStyle}></Circles>
    </FitBox>
  )
}
