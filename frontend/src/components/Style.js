import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const colors = {
  darkGreen: "#246A73",
  lightGreen: "#368F8B",
  dirtyWhite: "#F7F9F9",
  maron: "#904E55",
};

export const GlobalStyles = createGlobalStyle`

@keyframes fadeIn { 
  from{opacity: 0;}
  to{opacity: 1;}
 }

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

svg{
  animation: fadeIn 1s both;
}
`;
export const FitBox = styled.div`
  height: ${(props) => {
    return props.height ? props.height : "100%";
  }};
  width: ${(props) => {
    return props.width ? props.width : "100%";
  }};
  display: flex;
  flex-direction: ${(props) => {
    return props.flexDirection ? props.flexDirection : "column";
  }};
  justify-content: ${(props) => {
    return props.justifyContent ? props.justifyContent : "space-evenly";
  }};
  align-items: ${(props) => {
    return props.alignItems ? props.alignItems : "center";
  }};
  flex-wrap: ${(props) => {
    return props.wrap ? props.wrap : "no-wrap";
  }};
`;

export const NavColumn = styled(FitBox)`
  background-color: ${colors.darkGreen};
  color: ${colors.dirtyWhite};
  min-width: 150px;
`;

export const StyledLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.dirtyWhite};
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 200ms;
  &:hover {
    transform: scale(1.1);
  }
`;

export const MainBody = styled(FitBox)`
  overflow-y: ${(props) => {
    return props.overflowY ? props.overflowY : "scroll";
  }};
`;
export const DashboardBodyFlex = styled(FitBox)`
  overflow-y: ${(props) => {
    return props.overflowY ? props.overflowY : "scroll";
  }};
  background-color: ${(props) => {
    return props.backgroundColor ? props.backgroundColor : "";
  }};
  position: relative;
`;

export const WaveStyle = {
  position: "fixed",
  bottom: 0,
  left: "15%",
  zIndex: -1,
};

export const BlobBottomLeftStyle = {
  position: "fixed",
  bottom: 0,
  left: "15%",
  zIndex: -1,
};

export const BlobTopRightStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: -1,
};

export const BlobTopLeftStyle = {
  position: "fixed",
  top: 0,
  left: "15%",
  zIndex: -1,
};

export const BlobBottomRightStyle = {
  position: "fixed",
  bottom: 0,
  right: 0,
  zIndex: -1,
};

export const BackgroundStyle2 = {
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: -1,
};

export const BackgroundStyle = {
  position: "fixed",
  bottom: 0,
  left: "15%",
  zIndex: -1,
};

export const CirclesStyle = {
  position: "fixed",
  zIndex: -1,
};

export const BackArrowStyle = {
  position: "absolute",
  top: "2rem",
  left: "2rem",
  cursor: "pointer",
};

export const StartStyle = {
  position: "absolute",
  left: "30%",
  top: "23%",
};

export const StopStyle = {
  position: "absolute",
  left: "26%",
  top: "25%",
};

export const Title = styled(FitBox)`
  font-size: ${(props) => {
    return props.fontSize ? props.fontSize : "2.5rem";
  }};
  height: ${(props) => {
    return props.height ? props.height : "fit-content";
  }};
  font-weight: ${(props) => {
    return props.fontWeight ? props.fontWeight : "bold";
  }};
  color: ${(props) => {
    return props.color ? props.color : colors.darkGreen;
  }};
  margin: ${(props) => {
    return props.margin ? props.margin : "0";
  }};
`;

export const TextBox = styled(FitBox)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.darkGreen};
  text-align: center;
  mix-blend-mode: color-dodge;
`;

export const HomePageContent = styled.div`
  display: grid;
  width: 85%;
  height: 100%;
  padding: 3rem 3rem 0 3rem;
  transition: all 500ms;
  overflow-y: scroll;

  @media screen and (min-width: 1400px) {
    padding: 5rem 10rem 0 10rem;
  }
  grid-template-areas:
    "title1 title1 title1 title1 title1 title1 title1 title1"
    "text1 text1 text1 . . . image1 image1"
    "text1 text1 text1 . . . image1 image1"
    "text1 text1 text1 . . . image1 image1"
    "title2 title2 title2 title2 title2 title2 title2 title2"
    "image2 image2 . . . text2 text2 text2"
    "image2 image2 . . . text2 text2 text2"
    "image2 image2 . . . text2 text2 text2";

  @media screen and (max-width: 900px) {
    grid-template-areas:
      "title1 title1 title1 title1 title1 title1 title1 title1"
      "text1 text1 text1 text1 text1 text1 text1 text1"
      "text1 text1 text1 text1 text1 text1 text1 text1"
      "text1 text1 text1 text1 text1 text1 text1 text1"
      "title2 title2 title2 title2 title2 title2 title2 title2"
      "text2 text2 text2 text2 text2 text2 text2 text2"
      "text2 text2 text2 text2 text2 text2 text2 text2"
      "text2 text2 text2 text2 text2 text2 text2 text2";
  }
`;

export const StyledForm = styled.form`
  height: ${(props) => {
    return props.height ? props.height : "100%";
  }};
  width: ${(props) => {
    return props.width ? props.width : "100%";
  }};
  display: flex;
  flex-direction: ${(props) => {
    return props.flexDirection ? props.flexDirection : "column";
  }};
  justify-content: ${(props) => {
    return props.justifyContent ? props.justifyContent : "space-evenly";
  }};
  align-items: ${(props) => {
    return props.alignItems ? props.alignItems : "center";
  }};
  flex-wrap: ${(props) => {
    return props.wrap ? props.wrap : "no-wrap";
  }};
`;

export const StyledInput = styled.input`
  width: 75%;
  min-width: 300px;
  height: fit-content;
  margin: 0.15rem 0;

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
    box-shadow: 0 0 0 10rem ${colors.darkGreen} inset; /* Change the color to your own background color */
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 10rem ${colors.darkGreen} inset; /*your box-shadow*/
    box-shadow: 0 0 0 10rem ${colors.darkGreen} inset; /*your box-shadow*/
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:focus {
    transform: scale(1.05);
  }
`;

export const SubmitButton = styled.button`
  width: 25%;
  min-width: fit-content;
  height: fit-content;
  margin: 0.15rem 0;

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
`;

export const SearchInput = styled.input`
  width: 75%;
  min-width: 300px;
  height: fit-content;
  margin: 1rem 0;

  background-color: ${colors.maron};
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
    background-color: ${colors.maron};
    color: ${`${colors.dirtyWhite}44`};
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 10rem ${colors.maron} inset; /* Change the color to your own background color */
    box-shadow: 0 0 0 10rem ${colors.maron} inset; /* Change the color to your own background color */
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 10rem ${colors.maron} inset; /*your box-shadow*/
    box-shadow: 0 0 0 10rem ${colors.maron} inset; /*your box-shadow*/
    -webkit-text-fill-color: ${colors.dirtyWhite};
  }

  &:focus {
    transform: scale(1.05);
  }
`;

export const ListItem = styled.div`
  width: 75%;
  min-width: 300px;
  height: fit-content;
  margin: 0.5rem 0;

  background-color: ${`${colors.darkGreen}BB`};
  border: none;
  outline: none;

  text-align: center;
  color: ${colors.dirtyWhite};
  font-size: 2rem;
  font-weight: 300;

  padding: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);

  display: grid;
  grid-template-areas: "text1 . text2 . text3";
  place-items: center;
  gap: 0.4rem;

  user-select: none;

  transition: all 250ms ease-in-out;

  &:hover {
    background-color: ${`${colors.maron}BB`};
    transform: scale(1.01);
  }
`;

export const TimerCircle = styled.div`
  width: 30%;
  min-width: 300px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${colors.dirtyWhite};

  color: ${colors.darkGreen};
  font-size: 3rem;
  font-weight: bold;

  display: grid;
  place-items: center;
`;

export const TimerButton = styled.button`
  width: 5rem;
  min-width: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${colors.maron};
  border: none;
  cursor: pointer;
  position: relative;

  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const BreakBox = styled.div`
  width: 60%;
  height: 15%;
  display: grid;
  grid-template-areas:
    "breakIn . breakInTime breakInTime"
    "duration . durationTime durationTime";
  background-color: ${colors.dirtyWhite};
  place-items: center;
`;

export const BreakBoxInput = styled.input`
  line-height: 2.5rem;
  width: 90%;
  background-color: ${colors.dirtyWhite};

  text-align: center;
  color: ${colors.darkGreen};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  border-bottom: 1px solid ${`${colors.darkGreen}AA`};
`;

export const MonthGrid = styled.div`
  display: flex;
  width: calc(7 * 6rem);
  min-width: calc(7 * 6rem);
  max-width: calc(7 * 6rem);
  position: relative;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const MonthBubble = styled.div`
  width: 5rem;
  flex: 0 0 5rem;
  margin: 0.5rem 0.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${(props) => {
    return props.backgroundColor ? props.backgroundColor : colors.dirtyWhite;
  }};
  color: ${(props) => {
    return props.color ? props.color : colors.darkGreen;
  }};
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  transition: all 200ms;
  cursor: ${(props) => {
    return props.isToday ? "pointer" : "normal";
  }};
  &:hover {
    transform: ${(props) => {
      return props.isToday || props.admin ? "scale(1.1)" : "none";
    }};
    box-shadow: ${(props) => {
      return props.isToday || props.admin
        ? `0rem 0rem 2rem ${colors.darkGreen}`
        : "none";
    }};
  }
`;

export const DayNameLabel = styled.div`
  width: 5rem;
  flex: 0 0 5rem;
  margin: 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.dirtyWhite};
`;
export const TimerInput = styled.input.attrs({ type: "time" })`
  color: ${colors.darkGreen};
  font-size: 3rem;
  font-weight: bold;
  border: none;
  background: transparent;
  outline: none;
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;
export const TimerDisplay = styled.div`
  color: ${colors.darkGreen};
  font-size: 3rem;
  font-weight: bold;
  border: none;
  background: transparent;
  outline: none;
`;
