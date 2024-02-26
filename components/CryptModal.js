import React, {useContext} from "react";
import Modal from 'react-modal';
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
          <ModalImage source={globalState.items[0] && globalState.items[0].retrieved===true?{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_open.png?alt=media&token=a01596a9-fdc2-4cd0-a5ce-232d1fa6aa4c'}:{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_closed.png?alt=media&token=7f8915c8-f436-4810-b73b-7f5e1957aea5'}} />
        </Slot0>
        <Slot1 onPress={() => (globalState.items[1] && globalState.items[1].retrieved?null:cryptButton(1, globalState.user.email))} >
              <ModalImage source={globalState.items[1] && globalState.items[1].retrieved===true?{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_open.png?alt=media&token=a01596a9-fdc2-4cd0-a5ce-232d1fa6aa4c'}:{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_closed.png?alt=media&token=7f8915c8-f436-4810-b73b-7f5e1957aea5'}}/> 
        </Slot1>
      </TopView>
      <TopView>
          <Slot0 onPress={() =>(globalState.items[2] && globalState.items[2].retrieved?null: cryptButton(2, globalState.user.email))} >

              <ModalImage source={globalState.items[2] && globalState.items[2].retrieved===true?{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_open.png?alt=media&token=a01596a9-fdc2-4cd0-a5ce-232d1fa6aa4c'}:{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_closed.png?alt=media&token=7f8915c8-f436-4810-b73b-7f5e1957aea5'}}/>

          </Slot0>
          <Slot0 onPress={() => (globalState.items[3] && globalState.items[3].retrieved?null:cryptButton(3, globalState.user.email))}>
              <ModalImage source={globalState.items[3] && globalState.items[3].retrieved===true?{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_open.png?alt=media&token=a01596a9-fdc2-4cd0-a5ce-232d1fa6aa4c'}:{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/tomb_closed.png?alt=media&token=7f8915c8-f436-4810-b73b-7f5e1957aea5'}}/>
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

const TopView = styled.View`
  display: flex;
  flex-direction: row;
  height: 50%;
`

const ModalImage = styled.Image`
  width: 100%;
  height: 100%;
`;


export default CryptModal