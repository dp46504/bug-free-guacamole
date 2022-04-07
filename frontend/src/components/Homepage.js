import React, { useState, useEffect } from 'react'
import {
  FitBox,
  NavColumn,
  StyledLink,
  WaveStyle,
  Title,
  TextBox,
  HomePageContent,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Wave } from '../img/wave.svg'
import { ReactComponent as HomepageImg1 } from '../img/homepage-img.svg'
import { ReactComponent as HomepageImg2 } from '../img/homepage-img-2.svg'

export default function Homepage(props) {
  let [display, setDisplay] = useState(window.innerWidth <= 900 ? false : true)

  useEffect(() => {
    const hook = () => {
      setDisplay(window.innerWidth <= 900 ? false : true)
    }

    window.addEventListener('resize', hook)

    return () => {
      window.removeEventListener(hook)
    }
  }, [])

  return (
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
        {/* ONLY FOR DEVELOPMENT */}
        <StyledLink to='/user'>USER DASHBOARD</StyledLink>
        <StyledLink to='/administrator'>ADMIN DASHBOARD</StyledLink>
      </NavColumn>
      {/* Main body */}

      <HomePageContent width='85%'>
        <Title style={{ gridArea: 'title1' }}>About Us</Title>
        <TextBox style={{ gridArea: 'text1' }}>
          Gummies sweet chocolate cookie tart bonbon jujubes icing tart.
          Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes icing
          tart. Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes icing
          tart. Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.
        </TextBox>
        {display && (
          <HomepageImg2
            width='300'
            preserveAspectRatio='xMidYMid meet'
            style={{ padding: '2rem', gridArea: 'image1' }}></HomepageImg2>
        )}

        <Title style={{ gridArea: 'title2' }}>About App</Title>
        <TextBox style={{ gridArea: 'text2' }}>
          Gummies sweet chocolate cookie tart bonbon jujubes icing tart.
          Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes icing
          tart. Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes icing
          tart. Marshmallow marshmallow sweet fruitcake topping bear claw halvah
          powder bonbon.
        </TextBox>
        {display && (
          <HomepageImg1
            width='300'
            preserveAspectRatio='xMidYMid meet'
            style={{ padding: '2rem', gridArea: 'image2' }}></HomepageImg1>
        )}
      </HomePageContent>
      <Wave style={WaveStyle}></Wave>
    </FitBox>
  )
}
