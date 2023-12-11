import React, {useState, useEffect, useContext} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatListComponent } from 'react-native';
import styled from "styled-components/native";

import { Context } from '../AppContext';


Modal.setAppElement('#yourAppElement');

const RestModal = () =>{
  const{globalState, handleGlobalState} = useContext(Context);

  useEffect(() => {
    console.log("hit inside of useEffect")
    if(globalState.rest){
      setInterval(function(){
        handleGlobalState({rest: false})
  
      }, 10000)
    }
}, [globalState.rest]) 

  return(
      <ModalTemplate visible = {globalState.rest}>
        <ModalImage source={require('../assets/restImage.png')} />
      </ModalTemplate>
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


export default RestModal