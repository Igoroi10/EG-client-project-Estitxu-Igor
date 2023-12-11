import React, {useState, useEffect, useContext} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatListComponent } from 'react-native';
import styled from "styled-components/native";

import { Context } from '../AppContext';


Modal.setAppElement('#yourAppElement');

const TiredModal = () =>{
  const{globalState, handleGlobalState} = useContext(Context);

  // useEffect(() => {
  //   console.log("ÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇ" + globalState.user.characterStats.stamina)
  //   console.log(globalState.user.characterStats.stamina<=20?true:false)

  // }, [Object.values(globalState.userList)])

  return(
    <ModalPage>
      {globalState.user.rol == "Acolito" && (
        <ModalTemplate visible = {globalState.user.characterStats.stamina<=20?true:false}>
          <ModalImage source={require('../assets/tiredImage.png')} />
        </ModalTemplate>
      )}
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

const ModalImage = styled.Image`
  width: 100%;
  height: 100%;
`;


export default TiredModal