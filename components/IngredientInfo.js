import React, { useState, useEffect, useContext }  from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Text, View, TouchableOpacity , ScrollView} from 'react-native';

import { Context } from '../AppContext';


 
const ModalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 10px;
  text-align: right;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 0px;
  border-radius: 0px;
  left: 5%;
  top: -30%;
`;





const Buttons = styled.View`
  flex-direction: row;
`

const ContentContainer = styled.View`
  border-radius: 10px;
  margin-top: 20%;
  background-color: #fff;
  padding: 20px;
  width: 90%;
  
`;

const UserDetail = ({ isVisible, closeModal, item }) => {
  const{globalState, handleGlobalState} = useContext(Context);




    useEffect(() => {



     }, [])
   

      return (
        <Modal isVisible={isVisible}   alignItems='center'>
          <ContentContainer>
            <ScrollView>
              <View>
                <CloseButton onPress={closeModal}>
                    <ModalText>X </ModalText>
                  </CloseButton>
                

              

              </View>
            </ScrollView>
          </ContentContainer>
        </Modal>

      );
   
};


export default UserDetail;
