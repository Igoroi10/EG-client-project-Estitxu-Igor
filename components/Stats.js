import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;


const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: left;
  left: 20px;
`;


const FirstColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: -20px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 20px;
  top: -10px;

`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  left: 7px;
  top: 10px;
`;

const Stats = () => {
  return (
    <>
      <Container>
        <Column>
          <Title>Stats:</Title>
        </Column>
      </Container>
      <Container>
        <FirstColumn> 
          <Text>Fatigue  4</Text>
        </FirstColumn>
      </Container>
      <Container>
        <Column>
          <Text>Strength  27</Text>
        </Column>
        <Column>
          <Text>Endurance  99</Text>
        </Column>
      </Container>
      <Container>
        <Column>
          <Text>Agility  0</Text>
        </Column>
        <Column>
          <Text>Intelligence  98</Text>
        </Column>
      </Container>
    </>
  );
};

export default Stats;
