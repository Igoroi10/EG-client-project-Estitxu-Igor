import React from 'react';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;


const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 10px;
`;


const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 0px;
  top: 0px;

`;



const Diseases = ({user}) => {
  return (
    <>
      <Container>
        <Column>
          <Text>blindness {user.diseases.blindness}</Text>
        </Column>
        <Column>
        <Text>    fear {user.diseases.fear}</Text>
        </Column>
        <Column>
        <Text>hunger {user.diseases.hunger}</Text>
        </Column>
        <Column>
        <Text>madness {user.diseases.madness}</Text>
        </Column>
      </Container>
      <Container>
        <Column>
          <Text>       paralized {user.diseases.paralized}</Text>
        </Column>
        <Column>
          <Text>        psychosis {user.diseases.psychosis}</Text>
        </Column>
      </Container>
    </>
  );
};

// hambruna, , 
//   food-drumstick-off-outline, food-drumstick-outline

// ceguera, 
//   eye-off, eye-off-outline

// locura, 
//  bottle-tonic-skull-outline, bottle-tonic-skull

// miedo, 
// ghost, BiGhost

// paralisis, 
//  mood-bad, pan-tool


// psicosis

// AiFillExperiment


export default Diseases;
