import React, {useState, useEffect, useContext} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatListComponent } from 'react-native';
import styled from "styled-components/native";

import { Context } from '../AppContext';


Modal.setAppElement('#yourAppElement');

const TiredModal = () =>{
  const{globalState, handleGlobalState} = useContext(Context);

  return(
    <ModalPage>
        <ModalTemplate visible = {globalState.insideCrypt?true:false}>
          <ModalImage0 source={globalState.crypt[0]==="closed"?require('../assets/tower.png'):require('../assets/villano.png')} />
          <ModalImage1 source={globalState.crypt[1]==="closed"?require('../assets/tower.png'):require('../assets/villano.png')} />
          <ModalImage2 source={globalState.crypt[2]==="closed"?require('../assets/tower.png'):require('../assets/villano.png')} />
          <ModalImage3 source={globalState.crypt[3]==="closed"?require('../assets/tower.png'):require('../assets/villano.png')} />
        </ModalTemplate>
    </ModalPage>

  )
}


const ModalPage = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`


const ModalTemplate = styled.Modal`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ModalImage0 = styled.Image`
  width: 50%;
  height: 50%;
  
`;

const ModalImage1 = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 50%
`;

const ModalImage2 = styled.Image`
  width: 50%;
  height: 50%;
  margin-top: 50%
`;

const ModalImage3 = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 50%
  margin-top: 50%
`;


export default TiredModal