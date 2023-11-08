import React from "react";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import MainButtons from "../components/MainButtons";
import { storeData, getData } from '../helpers/localStorage';


const View = styled.View`
    flex: 1;
    justify-content: center;
top: 200px;
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

const LogOut = ({user}) => {
    const navigation = useNavigation();
    const reestoreData = async () => {
        await storeData(null)
      };

    return (
            <View>
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

                <Divider />

                <MainButtons label="Delete storage" align-items="center"  background="#FFFFFF"
 onPress={() => reestoreData()}/>
            </View>
    )
}

export default LogOut;