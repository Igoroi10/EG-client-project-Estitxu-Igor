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
  font-size: 18px;
  color: #333;
  margin-left: 10px;
`;

const UserImage = styled.Image`
  border-radius: 40px;
  width: 50px;
  height: 80px;
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
  top: 80px;
  left: 40px;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  border: 1px solid black;
  z-index: 1;
  position: absolute;
`;

const PieStyle = styled.View`
align-items: right;
right: -40px;
top: 5px;


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
              else if(user.characterStats.stamina <= ( (user.characterMaxStats.maxStamina-20)/2+20 ))
                pieColor = "yellow";
              else if(user.characterStats.stamina <= user.characterMaxStats.maxStamina)
                pieColor = "#9ACD32";

              let pieProgress = 0.01;
              if( user.characterStats.stamina > 0){
                pieProgress = ( user.characterStats.stamina * (1/user.characterMaxStats.maxStamina) );
              }
              
              return (
                <UserItem key={`${user._id}_${index}`}>
                  <UserInTower style={{ backgroundColor: user.towerAccess ? "#10D24B" : "red" }}/>
                  <UserImage source={{ uri: user.imgURL }} />
                  
                  <UserInfo>
                    
                    <UserEmail>{user.email}</UserEmail>
                    <UserThings>
                      <UserButton onPress={() => showAlertWithUsername(user, index)}>
                        <ButtonText>VER PERFIL</ButtonText>
                  
                
                    </UserButton>
                    <PieStyle>
                      <Progress.Pie
                          progress={pieProgress}
                          size={50}
                          color={pieColor}
                          unfilledColor="#D3D3D3"
                          borderColor="black"

                        />
                    </PieStyle>
                    </UserThings>
                    

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


