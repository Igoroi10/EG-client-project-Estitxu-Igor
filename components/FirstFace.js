import React from 'react'
// import {ScrollView} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    width: 100%;
    height: 250px;
    flex-direction: row;
    align-items: center;
    top: -10px;
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
    color: white;
    text-shadow: 2px 2px 2px black;
`;

const Text2 = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
    padding-top: 25px;
    text-align: center;
    color: black;
`;


const FirstFace = ({user}) => {

    if(user){
        return (
            <Container>
                <UserCard>
                    {user.imgURL && (
                        <ProfilePicture source={{ uri: user.imgURL }} />
                    )}
                    {user.image && (
                        <ProfilePicture source={{ uri: user.image }} />
                    )}

                </UserCard>
                <UserCardFooter>
                    {user.imgURL && (
                        <Text>{user.name}</Text>
                    )}

                    {user.image && (
                        <Text2>{user.name}</Text2>
                    )}
                </UserCardFooter>
            </Container>
            
    );

    }
    else{
        return(
            <>
            </>
        )
    }
};
  

export default FirstFace
