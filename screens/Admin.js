import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import UserDetail from '../components/UserDetail'; // Importa el nuevo componente

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



const FetchButton = ({ onPress }) => (
  <Button onPress={onPress}>
    <ButtonText>Obtener Correos Electrónicos</ButtonText>
  </Button>
);

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

 
  

  const fetchUserList = async () => {
    try {
      const response = await axios.get('https://fly-eg-staging.fly.dev/api/users/');
      const responseData = response.data.data;
      setUserList(responseData);
      setShowList(true);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
  };

  const showAlertWithUsername = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      {showList && (
        <UserList>
          {userList
            .filter((user) => user.rol === 'Acolito')
            .map((user) => (
              <UserItem key={user._id}>
                <UserInTower style={{ backgroundColor: user.towerAccess ? "#10D24B" : "red" }}/>
                <UserImage source={{ uri: user.imgURL }} />
                <UserInfo>
                  
                  <UserEmail>{user.email}</UserEmail>
                  <UserButton onPress={() => showAlertWithUsername(user)}>
                    <ButtonText>MOSTRAR PERFIL DEL ACÓLITO</ButtonText>
                  </UserButton>
                </UserInfo>
              </UserItem>
            ))
          }
        </UserList>
      )}
      <UserDetail
        isVisible={isModalVisible}
        user={selectedUser}
        closeModal={closeModal}
      />
      {!showList && <FetchButton onPress={fetchUserList} />}
    </Container>
  );
};

export default Admin;
