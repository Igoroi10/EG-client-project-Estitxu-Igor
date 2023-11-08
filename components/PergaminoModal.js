import React from 'react';
import Modal from 'react-modal';
import { Text, View, Button, Image } from 'react-native';
import styled from 'styled-components/native';
import { Z_ASCII } from 'zlib';

const ModalContainer = styled.Modal`
flex: 1;
justify-content: center;
align-items: center;
`;

const ContentContainer = styled.View`
background-color: red;
padding: 20px;
border-radius: 10px;
`;



const ModalImage = styled.Image`
width: 352px;
height: 400px;
`;

const PergaminoModal = ({towerStatus, setTowerStatus}) => {
  const cleanse = () =>{
    setTowerStatus('potionCreation')
  }
  
    console.log("towerstate"+towerStatus)
  return (

      <ModalContainer >
      <ContentContainer>
        <ModalImage source={require('../assets/pergaminoSucio.png')} />
        <Button
          title="Limpiar"
          onPress={cleanse}
        />
      </ContentContainer>
      </ModalContainer>

  );

}
  
export default PergaminoModal;

// 