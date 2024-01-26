import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import UserDetail from '../components/UserDetail'; // Importa el nuevo componente
import Toast from 'react-native-toast-message';

import { Context } from '../AppContext';

import * as Progress from 'react-native-progress';

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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const Button = styled.TouchableOpacity`
  background-color: #0073e6;
  padding: 10px 20px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const UserList = styled.View`
  margin-top: 20px;
  align-items: center;
  width: 100%;
`;

const UserItem = styled.View`
  background-color: #ffffff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  width: 90%;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.View`
  flex-direction: column;
  width: 280px;
`;

const UserEmail = styled.Text`
  font-size: 12px;
  color: #333;
  margin-left: 15px;
`;

const UserImage = styled.Image`
  border-radius: 60px;
  width: 100px;
  height: 100px;
`;

const UserButton = styled.TouchableOpacity`
  background-color: #0073e6;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px;
  align-items: left;
  width: 50%;
`;

const UserThings = styled.View`
flex-direction: row;

`

const UserInTower = styled.View`
  bottom: 10%;
  left: -8%;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  position: absolute;
  z-index: 2;
`;

const PieStyle = styled.View`
align-items: right;
right: -40px;
top: 5px;


`

const IconDisplay = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
`
const Icon = styled.Image`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`
const DamnIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`


const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const{globalState, handleGlobalState} = useContext(Context);
  const [userNum, setUserNum] = useState(0);
 
  


  const showAlertWithUsername = (user, index) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    setUserNum(index);

  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

 

          

  return (
    <Container>
        <UserList>
        {globalState.userList.map((user, index) => {
          if(user){
            if (user.rol === "Acolito" && (user.towerAccess || user.towerAccess==false)) {
              let pieColor = "red";

              if(user.characterStats.stamina <= 20)
                pieColor = "red";
              else if(user.characterStats.stamina <= ( (user.characterMaxStats.maxStamina/2)))
                pieColor = "yellow";
              else if(user.characterStats.stamina <= user.characterMaxStats.maxStamina)
                pieColor = "#9ACD32";

              let pieProgress = 0.01;
              if( user.characterStats.stamina > 0){
                pieProgress = ( user.characterStats.stamina * (1/user.characterMaxStats.maxStamina) );
              }
              
              return (
                <UserItem key={`${user._id}_${index}`}>
                  <UserImage source={{ uri: user.imgURL }} />
                  
                  <UserInfo>
                    <UserInTower style={{ backgroundColor: user.towerAccess ? "#10D24B" : "red" }}/>
                    <UserEmail>{user.name}</UserEmail>
                    <UserThings>
                      <UserButton onPress={() => showAlertWithUsername(user, index)}>
                        <ButtonText>VER PERFIL</ButtonText>
                  
                
                    </UserButton>
                    {/* <PieStyle>
                      <Progress.Pie
                          progress={pieProgress}
                          size={50}
                          color={pieColor}
                          unfilledColor="#D3D3D3"
                          borderColor="black"
                        />
                    </PieStyle> */}
                    </UserThings>
                    <IconDisplay>
                      {(user.diseases.marrow_apocalypse || user.diseases.rotting_plague || user.diseases.epic_weakness) && (
                        <Icon source={{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/poisoned_icon.jpeg?alt=media&token=8c6d2d52-c36b-4b88-bad5-7e203740ef2b'}}/>
                      )}
                      {user.diseases.ethazium && (
                        <Icon source={{uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/damned_icon.jpeg?alt=media&token=1e9c296b-28f2-400d-9594-d0536733900a'}}/>
                      )}
                    </IconDisplay>

                  </UserInfo>
                  </UserItem>
                );
              }
          }
          return null; 

          })}
        </UserList>
      
      <UserDetail
        isVisible={isModalVisible}
        choosedUser={selectedUser}
        closeModal={closeModal}
        num={userNum}
      />
    </Container>
  );
};

export default Admin;


