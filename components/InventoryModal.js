import React, { useState, useEffect, useContext }  from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { View, TouchableOpacity , ScrollView} from 'react-native';

import { Context } from '../AppContext';



const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;
 
const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: right;
  text-shadow: 2px 2px 2px black;

`;



const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const InventoryModal = ({ isVisible, closeModal }) => {
  const{globalState, handleGlobalState} = useContext(Context);


      

      return (
        <Modal isVisible={isVisible}>
          <ModalContainer>
          <BackgroundImage source='../assets/white.jpeg'>

          <ScrollView>

            <View>

              <TouchableOpacity onPress={closeModal}>
                  <ModalText>X </ModalText>
                </TouchableOpacity>

              
              
                

                  

            </View>
            </ScrollView>
            </BackgroundImage>


          </ModalContainer>
        </Modal>
      );
   
};


export default InventoryModal;
