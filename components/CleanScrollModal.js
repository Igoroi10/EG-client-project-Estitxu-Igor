import React from 'react';
import { Modal, Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';
import { useEffect } from 'react';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`

  align-items: center;
  position: absolute;
  top: 200px;
`;

const ContentText = styled.Text`
  color: black;
  align-items: center;
  top: 60px;
  z-index: 1;
  width: 200px;
`;

const ModalImage = styled.Image`
  position: absolute;
  width: 300px;
  height: 400px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50px;
  z-index: 1;
  right: -40px;
`;

const CloseButtonText = styled.Text`
  color: white;
  left: 15px;
  top: 10px;
`;

const CleanScrollModal = ({ potionStatus, setPotionCreated, towerStatus, setTowerStatus }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const deleteIngredients = () => {
    setSelectedIngredients([]);
  };
  
  const close = () => {
    setTowerStatus('start');
    setPotionCreated('start');
    deleteIngredients();
  };
  
  useEffect(() => {
    console.log("towerstatus: " + towerStatus);
    console.log("ingredients: ", selectedIngredients);
  }, [towerStatus, selectedIngredients]);
  
  return (
    <Modal transparent={true} visible={potionStatus === 'Potion of cleanse_parchment'}>
      <ModalContainer>
        <ContentContainer>
          <CloseButton onPress={close}>
            <CloseButtonText>X</CloseButtonText>
          </CloseButton>
          <ContentText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ContentText>
          <ModalImage source={require('../assets/scroll.png')} />
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default CleanScrollModal;
