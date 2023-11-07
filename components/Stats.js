import React from 'react';
import styled from 'styled-components/native';
import {View } from 'react-native'

const Container = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
  top: 10px;
  left: -10px;
`;


const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: left;
  left: 20px;
  top: -10px
`;


const FirstColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: -20px;
  top: 0px
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

const Stats = ({user}) => {
  return (
    <>
{user &&(
  <View>
    <Container>
      <FirstColumn> 
        <Text>Resistance  {user.characterStats.resistance}</Text>
      </FirstColumn>
    </Container>
    <Container>
      <Column>
        <Text>Strength  {user.characterStats.strength}</Text>
      </Column>
      <Column>
        <Text>Stamina  {user.characterStats.stamina}</Text>
      </Column>
    </Container>
    <Container>
      <Column>
        <Text>Agility  {user.characterStats.agility}</Text>
      </Column>
      <Column>
        <Text>Intelligence  {user.characterStats.intelligence}</Text>
      </Column>
    </Container>
  </View>
)}
      
    </>
  );
};

export default Stats;
