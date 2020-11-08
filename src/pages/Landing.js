import React from 'react';
import styled from 'styled-components';
import nwPlusLogo from '../assets/nwplus.svg';
import { Link } from 'react-router-dom'

const NwPlusImage = styled.img`
  margin-top: 5%;
  width: 250px;
  height: 250px;
  margin-bottom: 2%;
`;

const WelcomeTitle = styled.h1`
  font-size: 48px;
`;

const InfoMessage = styled.p`
  font-size: 32px;
  text-align: center;
`;

const linkStyle = {
  "fontSize": "32px",
  "margin": "32px 11px"
}

const HorizontalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Landing() {
  return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <NwPlusImage src={nwPlusLogo} />
        <WelcomeTitle>Welcome to the Assessment portal!</WelcomeTitle>
        <HorizontalContainer>
            <InfoMessage>Please click</InfoMessage> 
            {/* <Here href='/assessments'>here</Here> */}
            <Link to='/assessments' style={linkStyle}>here</Link>
            <InfoMessage>to continue to assessments.</InfoMessage>
        </HorizontalContainer>
      </div>
  );
}
