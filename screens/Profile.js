import React from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';


import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Toast from 'react-native-toast-message';



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
    color: white;
    text-shadow: 2px 2px 2px black;
`

const Container2 = styled.View`
  width: 100%;
  height: 65px;
  flex-direction: row;
  align-items: center;
`;

const NameColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 2px black;

`;

const Container3= styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
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
  color: white;
  left: 20px;
  top: -10px;
  text-shadow: 2px 2px 2px black;

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

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;


const Profile = ({user}) => {
    console.log(user)
    console.log("img"+user.imgURL)
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

    let backgroundImageLink;
    let linkForBackground;
    if(user.rol){
      switch(user.rol){
        case "Villano":
          linkForBackground=require('../assets/villano.png');
          break;

        case "Istvan":
          linkForBackground=require('../assets/villano.png');
          break;

        case "Mortimer":
          linkForBackground=require('../assets/sorcerer.webp');
          break;

        case "Acolito":
          linkForBackground=require('../assets/acolito.png');
          break;

        case "Jacob":
          linkForBackground=require('../assets/jacob.png');
          break;

        default:
          linkForBackground=require('../assets/white.jpeg'); //TODO cambiar a un fondo blanco o nulo


      }

    }
    console.log("backgroundImage:***********************")
    console.log(linkForBackground)

    return (
        <>
          <BackgroundImage source={linkForBackground}>
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

                  <Container>
                  <Button    label="Delete storage"  onPress={() => reestoreData()}>
                      <ButtonText>Delete storage</ButtonText>
                  </Button>
              </Container>

              </View>
              )}
          </BackgroundImage>
        </>
    )
}

export default Profile
