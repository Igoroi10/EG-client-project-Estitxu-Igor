import React from "react";
import Modal from 'react-modal';
import { View, Text, Image } from 'react-native';
import styled from "styled-components/native";

Modal.setAppElement('#yourAppElement');



const StandardModal = () =>{
            return(
                <ModalTemplate
                visible = {false}>
                    <Text>Modal</Text>
                </ModalTemplate>
            )
}



const ModalTemplate = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
`


export default StandardModal