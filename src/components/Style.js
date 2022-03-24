import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  darkGreen: '#246A73',
  lightGreen: '#368F8B',
  dirtyWhite: '#F7F9F9',
  maron: '#904E55',
}

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
}

html,body{
    width:100%;
    min-height:100vh;
    height:100%;
    font-family: 'Montserrat', sans-serif;
    margin:0;
    padding: 0;
}

#root{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
`

export const FitBox = styled.div`
  height: ${(props) => {
    return props.height ? props.height : '100%'
  }};
  width: ${(props) => {
    return props.width ? props.width : '100%'
  }};
  display: flex;
  flex-direction: ${(props) => {
    return props.flexDirection ? props.flexDirection : 'column'
  }};
  justify-content: ${(props) => {
    return props.justifyContent ? props.justifyContent : 'space-evenly'
  }};
  align-items: ${(props) => {
    return props.alignItems ? props.alignItems : 'center'
  }};
`

export const NavColumn = styled(FitBox)`
  background-color: ${colors.darkGreen};
  color: ${colors.dirtyWhite};
`

export const StyledLink = {
  fontSize: '2rem',
  fontWeight: 600,
  color: colors.dirtyWhite,
  cursor: 'pointer',
  textDecoration: 'none',
}

export const MainBody = styled(FitBox)`
  overflow-y: ${(props) => {
    return props.overflowY ? props.overflowY : 'scroll'
  }};
`

export const BackgroundStyle = {
  position: 'fixed',
  bottom: 0,
  left: '15%',
  width: '100%',
  zIndex: -1,
}

export const BackgroundStyle2 = {
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: -1,
}

export const Title = styled(FitBox)`
  font-size: ${(props) => {
    return props.fontSize ? props.fontSize : '2.5rem'
  }};
  font-weight: bold;
  color: ${(props) => {
    return props.color ? props.color : colors.darkGreen
  }};
`

export const TextBox = styled(FitBox)`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.lightGreen};
  text-align: center;
`

export const HomepageImg = {
  width: '40%',
  height: '40%',
}

export const StyledForm = styled(FitBox)``

export const StyledInput = styled.input`
  width: 75%;
  height: fit-content;

  background-color: ${colors.darkGreen};
  filter: opacity(0.75);
  border: none;
  outline: none;

  text-align: center;
  color: ${colors.dirtyWhite};
  font-size: 2rem;
  font-weight: 100;

  padding: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);

  transition: all 200ms ease-in-out;

  &::placeholder {
    background-color: ${colors.darkGreen};
    color: ${colors.dirtyWhite};
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 10rem ${colors.darkGreen} inset; /* Change the color to your own background color */
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 10rem ${colors.darkGreen} inset; /*your box-shadow*/
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:focus {
    transform: scale(1.05);
  }
`

export const SubmitButton = styled.button`
  width: 25%;
  height: fit-content;

  background-color: ${colors.maron};
  border: none;
  outline: none;

  text-align: center;
  color: ${colors.dirtyWhite};
  font-size: 2rem;
  font-weight: 100;

  cursor: pointer;

  padding: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);

  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`
