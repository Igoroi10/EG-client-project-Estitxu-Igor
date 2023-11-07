import React from 'react'
// import {ScrollView} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    width: 100%;
    height: 250px;
    flex-direction: row;
    align-items: center;
    background: #FFFFFF;
    bottom: 0px;
`

const UserCard = styled.View`
    width: 100%;
    height: 100%;
    margin-right: 10px;
    position: relative;
`


const ProfilePicture = styled.Image`
    width: 170px;
    height: 170px;
    border-radius: 85px;
    position: absolute;
    top: 5%;
    left: 25%;
`;



const UserCardFooter = styled.View`
    position: absolute;
    width: 100%;
    height: 25%;
    top: 170px;
    left: 0px;
`;

const Text = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
    padding-top: 25px;
    text-align: center;
    color: black;
`

const FirstFace = ({user}) => {
    return (
        <>
        {user &&(
            <Container>
                <UserCard>
                    <ProfilePicture source={{ uri: user.imgURL }} />
                </UserCard>
                <UserCardFooter>
                    <Text>{user?.name}</Text>
                </UserCardFooter>
            </Container>
        )}
            
        </>
    );
};
  

export default FirstFace
