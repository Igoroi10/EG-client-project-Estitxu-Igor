import React,{useContext, useState, useEffect} from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import * as Progress from 'react-native-progress';

import socket from '../helpers/socket';

import Toast from 'react-native-toast-message';

import { Context } from '../AppContext';
import InventoryModal from './../components/InventoryModal'

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
  top: -10px;

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

const ContainerButtons = styled.View`
    width: 100%;
    height: 70px;
    flex-direction: row;
    align-items: top;
    top: 10%;
    left: 0%;
    margin-left: 20%;
`


const Profile = ({user}) => {
  const{globalState, handleGlobalState} = useContext(Context)
  const [isModalVisible, setIsModalVisible] = useState(false);


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

    let linkForBackground = require('../assets/white.jpeg');
    if(globalState.user.rol){
      switch(globalState.user.rol){
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
          linkForBackground=require('../assets/white.jpeg'); 


      }

    }

    const restAcolyte = (email) =>{
      socket.emit("fullyRestore", email)
      console.log('************** REST SENT *******************')
      console.log(email)
      handleGlobalState({rest: true})

    }

    const openModal = () => {
      setIsModalVisible(true);  
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };



    return (
        <>
          <BackgroundImage source={linkForBackground}>
             
            {(globalState.user.characterMainData.HP || globalState.user.characterMainData.HP==0)&&(
            <View>
                <Container>
                    <UserCard>
                      {globalState.user.imgURL && (
                        <ProfilePicture source={{ uri: globalState.user.imgURL }} />
                      )}
                    </UserCard>
                    <UserCardFooter>
                        <Text>{globalState.user?.name}</Text>
                    </UserCardFooter>
                </Container>

                  <Divider />

                 
                <Container2>
                  
                    <NameColumn>
                    
                    <Text2>HP</Text2>
                    <Progress.Bar
                      progress={globalState.user.characterMainData.HP/100}
                      width={100}
                      color={'white'} 
                      borderColor={'grey'}
                      backgroundColor={'black'}

                    />
                    {/* <Text2>{globalState.user.characterMainData.HP}</Text2> */}
                    </NameColumn>
                    <NameColumn>
               
                    <Text2 top={2}>LvL</Text2>
                    <Text2 top={1}>{globalState.user.characterMainData.LvL}</Text2>
                    </NameColumn>
                    <NameColumn>
                    <Text2>Money</Text2>
                    <Progress.Bar
                      progress={globalState.user.characterMainData.Money/100}
                      width={100}
                      color={'white'} 
                      borderColor={'grey'}
                      backgroundColor={'black'}
                    />
                    {/* <Text2>{globalState.user.characterMainData.Money}</Text2> */}
                    </NameColumn>
                </Container2>
                
                <Divider />
                   
                    <Container3 left={10}>
                    <Column left={20}>
                        <Text3 >Strength</Text3>
                        <Progress.Bar
                          progress={globalState.user.characterStats.strength/100}
                          width={100}
                          color={'white'} 
                          borderColor={'grey'}
                          backgroundColor={'black'}
                        />
                    </Column>
                    <Column left={40}>
                        <Text3>Stamina</Text3>
                        <Progress.Bar
                          progress={globalState.user.characterStats.stamina/100}
                          width={100}
                          color={'white'} 
                          borderColor={'grey'}
                          backgroundColor={'black'}
                        />
                    </Column>
                    </Container3>
                    <Container3 left={10}>
                    <Column left={20}>
                        <Text3>Agility</Text3>
                        <Progress.Bar
                          progress={globalState.user.characterStats.agility/100}
                          width={100}
                          color={'white'} 
                          borderColor={'grey'}
                          backgroundColor={'black'}
                        />
                    </Column>
                    <Column left={40}>
                        <Text3 left={2}>Intelligence</Text3>
                        <Progress.Bar
                          progress={globalState.user.characterStats.intelligence/100}
                          width={100}
                          color={'white'} 
                          borderColor={'grey'}
                          backgroundColor={'black'}
                        />
                    </Column>
                </Container3>
                <ContainerButtons>
                {globalState.user.rol !== "Acolito" && (
                                    <Button  onPress={() => openModal()}>
                                      <ButtonText>inventory</ButtonText>
                                    </Button>
                                  )}
                </ContainerButtons>

                  <ContainerButtons>  
                  {globalState.user.rol === "Acolito" && globalState.user.characterStats.stamina < 100 && (                   
                    <Button    label="rest"  onPress={() => restAcolyte(globalState.user.email)}>
                        <ButtonText>Start resting</ButtonText>
                    </Button>
                  )}
 


                  <Button    label="Delete storage"  onPress={() => reestoreData()}>
                      <ButtonText>Delete storage</ButtonText>
                  </Button>

                  <InventoryModal
                    isVisible={isModalVisible}
                    closeModal={closeModal}
                  />
              </ContainerButtons>

              </View>
              )}
          </BackgroundImage>
        </>
    )
}

export default Profile
