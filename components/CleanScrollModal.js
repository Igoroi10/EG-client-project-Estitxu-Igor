import React from 'react';
import { Modal, Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native'; // Importa styled-components/native
// Define componentes de estilo
const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ContentContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
`;
const ContentText = styled.Text`
  color: black;
  position: absolute;
  top: 80px;
  left: 70px;
  z-index: 1;
  width: 200px;
`;
const ModalImage = styled.Image`
  width: 300px;
  height: 400px;
`;
const CleanScrollModal = ({potionStatus}) => {
  return (
    <Modal visible={potionStatus === 'Potion of cleanse_parchment'?true:false}>
      <ModalContainer>
        <ContentContainer>
          <ContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</ContentText>
          <ModalImage source={require('../assets/scroll.png')} />
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
}
export default CleanScrollModal;







