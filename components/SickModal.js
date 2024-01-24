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
            <ModalImage source={{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tired_modal.png?alt=media&token=4802d211-efe6-49d2-be88-061f943cfc4b'}} />
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