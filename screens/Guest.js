import React,{useContext, useState, useEffect} from 'react'
import styled from 'styled-components/native'

import socket from '../helpers/socket';

import { Context } from '../AppContext';





const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
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

const UserThings = styled.View`
  flex-direction: row;
`

const UserButton = styled.TouchableOpacity`
  background-color: #0073e6;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px;
  align-items: left;
  width: 50%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;


const Profile = () => {
  const{globalState, handleGlobalState} = useContext(Context)

  function applyCurse(userEmail){
    const data = {
      "email": userEmail,
      "apply": true,
      "diseaseId": "ethazium"
    }
    socket.emit('sickUser', data);
  }



    return (
      <>
      <Container>
        <UserList>
        {globalState.userList.map((user, index) => {
          if(user){
            if (user.rol === "Acolito" && (user.towerAccess || user.towerAccess==false)) {

              return (
                <UserItem key={`${user._id}_${index}`}>
                  <UserInTower style={{ backgroundColor: user.towerAccess ? "#10D24B" : "red" }}/>
                  <UserImage source={{ uri: user.imgURL }} />
                  
                  <UserInfo>
                    
                    <UserEmail>{user.name}</UserEmail>
                    <UserThings>
                      {!user.diseases.ethazium &&(
                        <UserButton onPress={() => applyCurse(user.email)}>
                          <ButtonText>apply ethazium</ButtonText>
                        </UserButton>

                      )}
                  
                    </UserThings>   

                  </UserInfo>
                  </UserItem>
              );
              }
          }

          })}
        </UserList>
      

    </Container>

    </>
  )
}

export default Profile
