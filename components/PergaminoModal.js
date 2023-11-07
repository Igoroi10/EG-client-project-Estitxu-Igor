import React from 'react';
import { Modal, Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
`;



const ModalImage = styled.Image`
  width: 300px;
  height: 400px;
`;

const PergaminoModal = (towerState, setTowerStatus) => {

    setTowerStatus(PotionCreation);
    return (
      <Modal
        animationType="slide"
        transparent={true}
      >
        <ModalContainer>
        <ContentContainer>
          <ModalImage source={require('../assets/pergaminoSucio.png')} />
          <Button
            title="Limpiar"
            onPress={() => {
              
            }}
          />
        </ContentContainer>
        </ModalContainer>
      </Modal>
    );
  }
  
export default PergaminoModal;
