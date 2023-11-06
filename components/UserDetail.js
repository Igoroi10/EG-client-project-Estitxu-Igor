import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import Profile from '../screens/Profile'
import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Diseases from '../components/Diseases';

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FFFFFF;
  padding: 20px;
`;
 
const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 10px;
  text-align: center;
  bottom: 10px;
`;


const UserDetail = ({ isVisible, user, closeModal }) => {
  if (user !== null) {
    return (
      <Modal isVisible={isVisible}>
        <ModalContainer>
          <View>

          <Profile user={user} />


            <TouchableOpacity onPress={closeModal}>
              <ModalText>Cerrar</ModalText>
            </TouchableOpacity>

          </View>
        </ModalContainer>
      </Modal>
    );
  } else {
    return null; // Otra opción es mostrar un mensaje de error si user es null.
  }
};


export default UserDetail;
