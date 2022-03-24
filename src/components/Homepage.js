import React from 'react'
import { Link } from 'react-router-dom'
import {
  FitBox,
  NavColumn,
  MainBody,
  NavItem,
  StyledLink,
  BackgroundStyle,
  Title,
  TextBox,
  HomepageImg,
} from './Style.js'
import { ReactComponent as MainLogo } from '../img/main-logo.svg'
import { ReactComponent as Wave } from '../img/wave.svg'
import { ReactComponent as HomepageImg1 } from '../img/homepage-img.svg'

export default function Homepage(props) {
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
        <MainBody width='85%'>
          <Wave style={BackgroundStyle}></Wave>
          <Title>About Us</Title>
          {/* tu jest problem */}
          <FitBox flexDirection='row'>
            <TextBox width='50%'>
              Gummies sweet chocolate cookie tart bonbon jujubes icing tart.
              Marshmallow marshmallow sweet fruitcake topping bear claw halvah
              powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes
              icing tart. Marshmallow marshmallow sweet fruitcake topping bear
              claw halvah powder bonbon.Gummies sweet chocolate cookie tart
              bonbon jujubes icing tart. Marshmallow marshmallow sweet fruitcake
              topping bear claw halvah powder bonbon.
            </TextBox>
            <HomepageImg1 width='50%' style={HomepageImg}></HomepageImg1>
          </FitBox>
          <Title>About App</Title>
          <FitBox flexDirection='row'>
            <TextBox width='50%'>
              Gummies sweet chocolate cookie tart bonbon jujubes icing tart.
              Marshmallow marshmallow sweet fruitcake topping bear claw halvah
              powder bonbon.Gummies sweet chocolate cookie tart bonbon jujubes
              icing tart. Marshmallow marshmallow sweet fruitcake topping bear
              claw halvah powder bonbon.Gummies sweet chocolate cookie tart
              bonbon jujubes icing tart. Marshmallow marshmallow sweet fruitcake
              topping bear claw halvah powder bonbon.
            </TextBox>
            <HomepageImg1 width='50%' style={HomepageImg}></HomepageImg1>
          </FitBox>
        </MainBody>
      </FitBox>
    </>
  )
}
