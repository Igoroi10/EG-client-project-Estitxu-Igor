import React, {useState, useEffect, useContext} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableHighlight } from 'react-native';
import styled from "styled-components/native";

import { Context } from '../AppContext';

import cryptButton from "../helpers/cryptFunction";


Modal.setAppElement('#yourAppElement');

const CryptModal = () =>{
  const{globalState, handleGlobalState} = useContext(Context);
  

  return(
    <ModalPage visible = {globalState.insideCrypt?true:false}>
      <TopView>
        <Slot0 onPress={() => (globalState.items[0] && globalState.items[0].retrieved?null:cryptButton(0, globalState.user.email))} >
          <ModalImage source={globalState.items[0] && globalState.items[0].retrieved===true?require('../assets/tomb_open.png'):require('../assets/tomb_closed.png')} />
        </Slot0>
        <Slot1 onPress={() => (globalState.items[1] && globalState.items[1].retrieved?null:cryptButton(1, globalState.user.email))} >
              <ModalImage source={globalState.items[1] && globalState.items[1].retrieved===true?require('../assets/tomb_open.png'):require('../assets/tomb_closed.png')}/> 
        </Slot1>
      </TopView>
      <TopView>
          <Slot0 onPress={() =>(globalState.items[2] && globalState.items[2].retrieved?null: cryptButton(2, globalState.user.email))} >

              <ModalImage source={globalState.items[2] && globalState.items[2].retrieved===true?require('../assets/tomb_open.png'):require('../assets/tomb_closed.png')}/>

          </Slot0>
          <Slot0 onPress={() => (globalState.items[3] && globalState.items[3].retrieved?null:cryptButton(3, globalState.user.email))}>
              <ModalImage source={globalState.items[3] && globalState.items[3].retrieved===true?require('../assets/tomb_open.png'):require('../assets/tomb_closed.png')}/>
          </Slot0>
        </TopView>
    </ModalPage>
  )
}


const ModalPage = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`
const Slot0 = styled.TouchableHighlight`
  width: 50%;
  height: 100%;
`
const Slot1 = styled.TouchableHighlight`
  width: 50%;
  height: 100%;
`
const Slot2 = styled.TouchableHighlight`
  width: 50%;
  height: 50%;
`
const Slot3 = styled.TouchableHighlight`
  width: 50%;
  height: 51%;

`

const TopView = styled.View`
  display: flex;
  flex-direction: row;
  height: 50%;
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


export default CryptModal