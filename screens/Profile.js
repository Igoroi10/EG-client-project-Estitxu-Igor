import React,{useContext} from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';

import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Toast from 'react-native-toast-message';

import { Context } from '../AppContext';

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


const Profile = ({user}) => {
  const{globalState, handleGlobalState} = useContext(Context)

  const navigation = useNavigation();
  const reestoreData = async () => {
      await storeData(null)
      Toast.show({
        type: 'success', // Toast type
        position: 'bottom', // Toast position
        text1: 'CACHE BORRADO', // Title
        text2: "Cache borrado con exito", // Message
      });
    };
    return (
        <>
            {globalState.user.characterMainData.LvL &&(
            <View>
                <Container>
                    <UserCard>
                        <ProfilePicture source={{ uri: globalState.user.imgURL }} />
                    </UserCard>
                    <UserCardFooter>
                        <Text>{user?.name}</Text>
                    </UserCardFooter>
                </Container>

                <Divider /> 

                <Container2>
                    <NameColumn>
                    <Text2>HP</Text2>
                    <Text2>{globalState.user.characterMainData.HP}</Text2>
                    </NameColumn>
                    <NameColumn>
                    <Text2>LvL</Text2>
                    <Text2>{globalState.user.characterMainData.LvL}</Text2>
                    </NameColumn>
                    <NameColumn>
                    <Text2>Money</Text2>
                    <Text2>{globalState.user.characterMainData.Money}</Text2>
                    </NameColumn>
                </Container2>
                
                <Divider />
                    <Container3>
                    <FirstColumn> 
                        <Text3>Resistance  {globalState.user.characterStats.resistance}</Text3>
                    </FirstColumn>
                    </Container3>
                    <Container3>
                    <Column>
                        <Text3>Strength  {globalState.user.characterStats.strength}</Text3>
                    </Column>
                    <Column>
                        <Text3>Stamina  {globalState.user.characterStats.stamina}</Text3>
                    </Column>
                    </Container3>
                    <Container3>
                    <Column>
                        <Text3>Agility  {globalState.user.characterStats.agility}</Text3>
                    </Column>
                    <Column>
                        <Text3>Intelligence  {globalState.user.characterStats.intelligence}</Text3>
                    </Column>
                </Container3>

                <Container>
                <Button    label="Delete storage"  onPress={() => reestoreData()}>
                    <ButtonText>Delete storage</ButtonText>
                </Button>
            </Container>
       
            </View>
            )}
        </>
    )
}

export default Profile
