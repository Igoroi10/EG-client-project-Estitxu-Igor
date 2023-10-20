import React from "react";
import Modal from 'react-modal';
import { View, Text, Image } from 'react-native';
import styled from "styled-components/native";

Modal.setAppElement('#yourAppElement');



const GoogleModal = ({logStatus}) =>{
    console.log(logStatus)
            return(
                <ModalTemplate
                visible = {logStatus?false:true}>
                    <Text>Google</Text>
                </ModalTemplate>
            )
}



const ModalTemplate = styled.Modal`
    position: absolute;
    width: 100%;
    height: 100%;
`

const Button = styled.Button`
 width: 42px;
 height: 42px;
 border-radius: 10px;
 margin-left: 16px;
 background: #EEEEEE;
 align-items: center;
 justify-content: center;
`

export default GoogleModal