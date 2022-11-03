import styled from "styled-components";
import { View } from 'react-native';


// colors
export const Colors = 
{
    primary: '#af40e3',
    primHover: '#a121de',
    secondary: '#1BD760',
    secondHover: '#139761',
    background: '#240530',
    white: '#FFFFFF',
    red: '#EF4444',
};

const {primary, primHover, secondary, secondHover, background, white, red} = Colors;

export const StyledContainer = styled.view`
    flex: 1;
    background-color: ${background};
`;

export const InnerContainer = styled.view`
    flex: 1;
    alignItems: "center";
    justifyContent: "center";
`;

export const LoginLogo = styled.image`
    marginBottom: 25;
`;

export const TitleLogin = styled.text`
    marginBottom: 25;
    fontSize: 60px;
    color:  ${white};
`;

export const StyledFormArea = styled.view`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`

`;