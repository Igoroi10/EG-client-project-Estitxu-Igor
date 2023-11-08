import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
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
  margin-top:20%;
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

const PergaminoModal = ({ towerStatus, setTowerStatus }) => {
  const cleanse = () => {
    setTowerStatus('potionCreation');
  };

  return (
    <ModalContainer transparent={true} visible={towerStatus === 'corruptScroll' ? true : false}>
      <ContentContainer>
        <ModalImage source={require('../assets/pergaminoSucio.png')} />
        <CleanButton onPress={cleanse}>
          <CleanButtonText>Limpiar</CleanButtonText>
        </CleanButton>
      </ContentContainer>
    </ModalContainer>
  );
};

export default PergaminoModal;
