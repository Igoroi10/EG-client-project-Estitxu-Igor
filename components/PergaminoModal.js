import React from 'react';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { useState } from 'react';
const ModalContainer = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  margin-top: 20%;
  left: 25px;

`;

const ModalImage = styled.Image`
  width: 300px;
  height: 450px;
`;

const CleanButton = styled.TouchableOpacity`
  background-color: grey;
  padding: 10px;
  border-radius: 5px;
  width: 85%;
`;

const CleanButtonText = styled.Text`
  color: white;
  text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50px;
  right: 60px;
`;

const CloseButtonText = styled.Text`
  color: white;
  left: 15px;
  top: 10px;
`;

const PergaminoModal = ({ towerStatus, setTowerStatus, potionStatus}) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const deleteIngredients = () => {
    setSelectedIngredients([]);
  };

  const cleanse = () => {
    setTowerStatus('potionCreation');
    deleteIngredients();
    
  };

  const close = () => {
    setTowerStatus('start');
    console.log(towerStatus)
    console.log(selectedIngredients)
  };

  return (
    <ModalContainer transparent={true} visible={towerStatus === 'corruptScroll' && potionStatus !=='Potion of cleanse_parchment' ? true : false}>
      <ContentContainer>
        <CloseButton onPress={close}>
          <CloseButtonText>X</CloseButtonText>
        </CloseButton>
        <ModalImage source={require('../assets/pergaminoSucio.png')} />
        <CleanButton onPress={cleanse}>
          <CleanButtonText>Limpiar</CleanButtonText>
        </CleanButton>
      </ContentContainer>
    </ModalContainer>
  );
};

export default PergaminoModal;
