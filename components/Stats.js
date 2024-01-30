import React from 'react';
import styled from 'styled-components/native';
import {View } from 'react-native'
import * as Progress from 'react-native-progress';
import { MARROW_APOCALYPSE_DEBUFF, EPIC_WEAKNESS_DEBUFF, ETHAZIUM_DEBUFF, ROTTING_PLAGUE_DEBUFF } from '../constants/constants';


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
          progress={!user.diseases.ethazium&&!user.diseases.epic_weakness?user.characterStats.strength/100:
                    user.diseases.ethazium&&!user.diseases.epic_weakness?user.characterStats.strength*ETHAZIUM_DEBUFF/100:
                    !user.diseases.ethazium&&user.diseases.epic_weakness?user.characterStats.strength*EPIC_WEAKNESS_DEBUFF/100:
                    user.characterStats.strength*EPIC_WEAKNESS_DEBUFF*ETHAZIUM_DEBUFF/100}
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
          progress={!user.diseases.ethazium&&!user.diseases.marrow_apocalypse?user.characterStats.agility/100:
                    user.diseases.ethazium&&!user.diseases.marrow_apocalypse?user.characterStats.agility*ETHAZIUM_DEBUFF/100:
                    !user.diseases.ethazium&&user.diseases.marrow_apocalypse?user.characterStats.agility*MARROW_APOCALYPSE_DEBUFF/100:
                    user.characterStats.agility*MARROW_APOCALYPSE_DEBUFF*ETHAZIUM_DEBUFF/100}
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
          progress={!user.diseases.ethazium&&!user.diseases.rotting_plague?user.characterStats.agility/100:
                    user.diseases.ethazium&&!user.diseases.rotting_plague?user.characterStats.agility*ETHAZIUM_DEBUFF/100:
                    !user.diseases.ethazium&&user.diseases.rotting_plague?user.characterStats.agility*ROTTING_PLAGUE_DEBUFF/100:
                    user.characterStats.agility*ROTTING_PLAGUE_DEBUFF*ETHAZIUM_DEBUFF/100}
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
