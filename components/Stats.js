import React from 'react';
import styled from 'styled-components/native';
import {View } from 'react-native'
import * as Progress from 'react-native-progress';


const Container = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
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
  color: white;
  left: 20px;
  top: -10px;
  text-shadow: 2px 2px 2px black;
`;



const Stats = ({user}) => {
  return (
    <>
{user &&(
  <View left={12}>
  
    <Container>
      <Column>
        <Text>Strength</Text>
        <Progress.Bar
          progress={user.characterStats.strength/100}
          width={100}
          color={'white'} 
          borderColor={'grey'}
          backgroundColor={'black'}
          left={10}
        />
      </Column>
      <Column>
        <Text>Stamina</Text>
        <Progress.Bar
          progress={user.characterStats.stamina/100}
          width={100}
          color={'white'} 
          borderColor={'grey'}
          backgroundColor={'black'}
          left={10}
        />
      </Column>
    </Container>
    <Container>
      <Column>
        <Text>Agility</Text>
        <Progress.Bar
          progress={user.characterStats.agility/100}
          width={100}
          color={'white'} 
          borderColor={'grey'}
          backgroundColor={'black'}
          left={10}
        />
      </Column>
      <Column>
        <Text>Intelligence</Text>
        <Progress.Bar
          progress={user.characterStats.intelligence/100}
          width={100}
          color={'white'} 
          borderColor={'grey'}
          backgroundColor={'black'}
          left={10}
        />
      </Column>
    </Container>
  </View>
)}
      
    </>
  );
};

export default Stats;
