import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import Profile from '../screens/Profile'

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
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 10px;
  text-align: center;
`;

////////////////////////////////


const UserCard = styled.View`
    width: 110px;
    height: 200px;
    margin-right: 0px;
    position: relative;
`


const ProfilePicture = styled.Image`
    width: 170px;
    height: 170px;
    border-radius: 85px;
    position: absolute;
    top: 5%;
    left: 45%;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;


const UserDetail = ({ isVisible, user, closeModal }) => {
  return (
    <Modal isVisible={isVisible}>
      {console.log("USERRRRRRRRRR" + user)}
      {user !== null && (
        <ModalContainer>
          <View>
            <ModalTitle>Perfil del Acolito</ModalTitle>
            <UserCard>
              <ProfilePicture source={{ uri: user.imgURL }} />
            </UserCard>
            <ModalText>{user?.name}</ModalText>






            <TouchableOpacity onPress={closeModal}>
              <ModalText>Cerrar</ModalText>
            </TouchableOpacity>
          </View>
        </ModalContainer>
      )}

    </Modal>
  );
};

export default UserDetail;
