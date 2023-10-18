import React from "react";
import Modal from 'react-modal';
import styled from "styled-components/native";
import pageState from '../App'

Modal.setAppElement('#yourAppElement');



const googlePage = () =>{
    return(
        <Modal 
            isOpen={pageState = 'googlePage'? true : false}
        >
            <Button>Google button</Button>
        </Modal>
    )
}

const modalTemplate = styled.Modal`
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

export {
    googlePage
}