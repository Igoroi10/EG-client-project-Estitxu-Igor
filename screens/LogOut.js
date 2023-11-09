import React from "react";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import MainButtons from "../components/MainButtons";
import { storeData, getData } from '../helpers/localStorage';


const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    top: 0px;
    height: 100%;

`

const Container = styled.View`
    width: 100%;
    height: 50%;
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
    top: 270px;
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

const Button = styled.TouchableOpacity`
 width: 70%;
 height: 42px;
 border-radius: 10px;
 margin-left: 16px;
 background: grey;
 align-items: center;
 justify-content: center;
 left: 15%;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const LogOut = ({user}) => {
    const navigation = useNavigation();
    const reestoreData = async () => {
        await storeData(null)
      };

    return (
        <View>
            {user!==undefined &&(
                    <Container>
                        <UserCard>
                            {user.imgURL &&(
                                <ProfilePicture source={{ uri: user.imgURL }} />
                            )}
                        </UserCard>
                        <UserCardFooter>
                            <Text>{user?.name}</Text>
                        </UserCardFooter>
                    </Container>
            )}
            <Container>
                <Button    label="Delete storage"  onPress={() => reestoreData()}>
                    <ButtonText>Delete storage</ButtonText>
                </Button>
            </Container>
        </View>
    )
}

export default LogOut;