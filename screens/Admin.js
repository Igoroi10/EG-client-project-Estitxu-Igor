import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';

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

const FetchButton = ({ onPress }) => (
  <Button onPress={onPress}>
    <ButtonText>Obtener Correos Electrónicos</ButtonText>
  </Button>
);

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://192.168.1.168:3000/api/users');
      const responseData = response.data.data;
      setUserList(responseData);
      setShowList(true);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
  };

  if (showList) {
    return (
      <Container>
        <UserList>
          {userList.map((user) => (
            <UserItem key={user._id}>
              <UserImage source={{ uri: user.imgURL }} />
              <UserInfo>
                <UserEmail>{user.email}</UserEmail>
                <UserButton>
                  <ButtonText>MOSTRAR PERFIL</ButtonText>
                </UserButton>
              </UserInfo>
            </UserItem>
          ))}
        </UserList>
      </Container>
    );
  }

  return (
    <Container>
      <FetchButton onPress={fetchUserList} />
    </Container>
  );
};

export default Admin;
