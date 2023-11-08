import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

const ModalContainer = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.View`
  padding: 20px;
  border-radius: 10px;

`;

const ModalImage = styled.Image`
  width: 300px;
  height: 450px;
`;

const CleanButton = styled.Button`

`;

const PergaminoModal = ({ towerStatus, setTowerStatus }) => {
  const cleanse = () => {
    setTowerStatus('potionCreation');
  };

  return (
    <ModalContainer transparent={true} visible={towerStatus === 'corruptScroll' ? true : false}>
      <ContentContainer>
        <ModalImage source={require('../assets/pergaminoSucio.png')} />
        <CleanButton title="Limpiar" onPress={cleanse} />
      </ContentContainer>
    </ModalContainer>
  );
};

export default PergaminoModal;
