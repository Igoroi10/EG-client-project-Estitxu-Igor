import React from 'react'
import styled from 'styled-components/native'

import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';



const View = styled.View`
    flex: 1;
    align-items: center;
`


const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;

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
    border-width: 5px;
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

const Container2 = styled.View`
  width: 100%;
  height: 65px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;

const NameColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const Container3= styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;


const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: left;
  left: 20px;
`;


const FirstColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: -20px;
`;

const Text3 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 20px;
  top: -10px;

`;

const Container4 = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
`;


const Column4 = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 10px;
`;


const Text4 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 0px;
  top: 0px;

`;


const Profile = ({user}) => {
  console.log("USER2" + user)
  return (
        <>
            {user.characterMainData &&(
            <View>
                <Container>
                    <UserCard>
                        <ProfilePicture source={{ uri: user.imgURL }} />
                    </UserCard>
                    <UserCardFooter>
                        <Text>{user?.name}</Text>
                    </UserCardFooter>
                </Container>

                <Divider /> 

                <Container2>
                    <NameColumn>
                    <Text2>HP</Text2>
                    <Text2>{user.characterMainData.HP}</Text2>
                    </NameColumn>
                    <NameColumn>
                    <Text2>LvL</Text2>
                    <Text2>{user.characterMainData.LvL}</Text2>
                    </NameColumn>
                    <NameColumn>
                    <Text2>Money</Text2>
                    <Text2>{user.characterMainData.Money}</Text2>
                    </NameColumn>
                </Container2>
                
                <Divider />
                
                    <Container3>
                    <FirstColumn> 
                        <Text3>Resistance  {user.characterStats.resistance}</Text3>
                    </FirstColumn>
                    </Container3>
                    <Container3>
                    <Column>
                        <Text3>Strength  {user.characterStats.strength}</Text3>
                    </Column>
                    <Column>
                        <Text3>Stamina  {user.characterStats.stamina}</Text3>
                    </Column>
                    </Container3>
                    <Container3>
                    <Column>
                        <Text3>Agility  {user.characterStats.agility}</Text3>
                    </Column>
                    <Column>
                        <Text3>Intelligence  {user.characterStats.intelligence}</Text3>
                    </Column>
                </Container3>

       
            </View>
            )}
        </>
    )
}

export default Profile
