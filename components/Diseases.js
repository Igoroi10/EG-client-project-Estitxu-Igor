import React from 'react';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  width: 100%;
  height: 120px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;


const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: 0px;
`;


const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 0px;
  top: 0px;

`;



const Diseases = () => {
  return (
    <>
      <Container>
        <Column>
          <Text>famine</Text>
          <Icon name="fast-food-outline" color="black" />        
        </Column>
        <Column>
          <Text>blindness</Text>
          <Icon name="eye-off" color="red" />        

        </Column>
        <Column>
          <Text>craziness</Text>
          <Icon name="bottle-tonic-skull" color="black" />        

        </Column>
        <Column>
          <Text>fear</Text>
          <Icon name="ghost" color="black" />        

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
