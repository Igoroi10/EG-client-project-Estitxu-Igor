import React from 'react'
// import {ScrollView} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    width: 100%;
    height: 300px;
    flex-direction: row;
    align-items: center;
    background: #FFFFFF;
`

const UserCard = styled.View`
    width: 110px;
    height: 200px;
    margin-right: 10px;
    position: relative;
`


const ProfilePicture = styled.Image`
    width: 170px;
    height: 170px;
    border-radius: 85px;
    position: absolute;
    top: 5%;
    left: 110%;
`;



const UserCardFooter = styled.View`
    position: absolute;
    width: 100%;
    height: 25%;
    top: 230px;
    left: 0px;
`
const Text = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
    padding-top: 25px;
    text-align: center;
    color: black;
`

const FirstFace = () => {
    return (
        <>
            <Container>
                
                <UserCard>
                    <ProfilePicture source={require('../assets/ancientTree.png')} />
                </UserCard>
                <UserCardFooter profile={true}>
                    <Text>Ancient Tree</Text>
                </UserCardFooter>
            </Container>
        </>
    );
};
  

export default FirstFace
