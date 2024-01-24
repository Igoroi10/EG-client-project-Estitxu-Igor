import React, {useState, useEffect, useContext} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatListComponent } from 'react-native';
import styled from "styled-components/native";

import { Context } from '../AppContext';


Modal.setAppElement('#yourAppElement');

const SickModal = () =>{
  const{globalState, handleGlobalState} = useContext(Context);


  return(
    globalState.user.diseases.marrow_apocalypse&&(
        <ModalTemplate visible = {globalState.user.diseases.marrow_apocalypse || globalState.user.diseases.epic_weakness || globalState.user.diseases.ethazium || globalState.user.diseases.rotting_plague}>
            <ModalImage source={require('../assets/villano.png')} />
        </ModalTemplate>
    )

  )
}





const ModalTemplate = styled.Modal`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 100%;
`;


export default SickModal