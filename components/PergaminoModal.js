import React from 'react';
import { Modal, Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native';
import { Z_ASCII } from 'zlib';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  position: absolute;
  margin-top: 20%;
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
`;



const ModalImage = styled.Image`
  width: 300px;
  height: 400px;
`;

const PergaminoModal = (towerState, setTowerStatus) => {
    const cleanse = () =>{
      setTowerStatus('potionCreation')
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={towerState === 'corruptScroll'?true:false}
      >
        <ModalContainer>
        <ContentContainer>
          <ModalImage source={require('../assets/pergaminoSucio.png')} />
          <Button
            title="Limpiar"
            onPress={cleanse}
          />
        </ContentContainer>
        </ModalContainer>
      </Modal>
    );
  }
  
export default PergaminoModal;
