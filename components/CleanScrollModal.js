import React from 'react';
import { Modal, Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const ContentText = styled.Text`
  color: black;
  top: 210px;
  left:10px;
  z-index:1;
`;

const ModalImage = styled.Image`
  width: 300px;
  height: 400px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50px;
  z-index: 1;
`;

const CloseButtonText = styled.Text`
  color: white;
  left: 15px;
  top: 10px;
`;

const CleanScrollModal = ({ potionStatus, towerStatus, setTowerStatus }) => {
  const close = () => {
    setTowerStatus('corruptScroll');
    console.log(towerStatus);
  };

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
