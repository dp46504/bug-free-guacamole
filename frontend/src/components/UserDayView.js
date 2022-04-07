import React from 'react'
import {
  FitBox,
  NavColumn,
  StyledLink,
  CirclesStyle,
  Title,
  DashboardBodyFlex,
  colors,
  BackArrowStyle,
  TimerCircle,
  TimerButton,
  StartStyle,
  StopStyle,
  BreakBox,
  BreakBoxInput,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Circles } from '../img/circle.svg'
import { ReactComponent as BackArrow } from '../img/back-arrow.svg'
import { ReactComponent as Start } from '../img/start.svg'
import { ReactComponent as Stop } from '../img/stop.svg'

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
      <FitBox>
        <Title height='12%'>Dashboard</Title>
        <DashboardBodyFlex
          backgroundColor={`${colors.darkGreen}AA`}
          justifyContent='flex-start'
          flexDirection='row'>
          <BackArrow style={BackArrowStyle}></BackArrow>
          {/* Left side */}
          <FitBox width='50%'>
            <Title color={colors.dirtyWhite} fontWeight='500' margin='4rem 0'>
              DAY FORMAT
            </Title>
            <TimerCircle>08:00:00</TimerCircle>
            <FitBox flexDirection='row' width='40%'>
              <TimerButton>
                <Start style={StartStyle} width='50%' height='50%'></Start>
              </TimerButton>
              <TimerButton>
                <Stop style={StopStyle} width='50%' height='50%'></Stop>
              </TimerButton>
            </FitBox>
          </FitBox>
          {/* Right Side */}
          <FitBox width='50%'>
            <BreakBox>
              <Title style={{ gridArea: 'breakIn' }} fontSize='2rem'>
                Break In:{' '}
              </Title>
              <BreakBoxInput
                type='time'
                min='00:00'
                max='08:00'
                style={{ gridArea: 'breakInTime' }}></BreakBoxInput>
              <Title style={{ gridArea: 'duration' }} fontSize='2rem'>
                Duration:
              </Title>
              <BreakBoxInput
                type='number'
                min='5'
                max='30'
                style={{ gridArea: 'durationTime' }}></BreakBoxInput>
            </BreakBox>
            <BreakBox>
              <Title style={{ gridArea: 'breakIn' }} fontSize='2rem'>
                Break In:{' '}
              </Title>
              <BreakBoxInput
                type='time'
                min='00:00'
                max='08:00'
                style={{ gridArea: 'breakInTime' }}></BreakBoxInput>
              <Title style={{ gridArea: 'duration' }} fontSize='2rem'>
                Duration:
              </Title>
              <BreakBoxInput
                type='number'
                min='5'
                max='30'
                style={{ gridArea: 'durationTime' }}></BreakBoxInput>
            </BreakBox>
          </FitBox>
        </DashboardBodyFlex>
      </FitBox>
      <Circles style={CirclesStyle}></Circles>
    </FitBox>
  )
}
