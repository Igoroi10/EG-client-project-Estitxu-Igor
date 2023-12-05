import React, { useState, useEffect, useContext }  from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Text, View, TouchableOpacity , ScrollView} from 'react-native';
import Profile from '../screens/Profile'
import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Slider from '@react-native-community/slider';
import { storeData, getData } from '../helpers/localStorage';

import socket from '../helpers/socket';

import { Context } from '../AppContext';






const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;
 
const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: right;
  text-shadow: 2px 2px 2px black;

`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
  top: -10px;
`;


const CureDisButton = styled.TouchableOpacity`
  background-color: purple;
  padding: 10px 20px;
  border-radius: 10px;
  border-color: black;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  left: 65px;
  top: -5px;

`;
const CureDisButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;

`;

const CureButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px 20px;
  border-radius: 10px;
  border-color: black;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  left: 65px;
  top: 5px;
`;
const CureButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;

`;

const SliderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0px;
  text-align: center;
  bottom: 0px;
  top: -10px;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const UserDetail = ({ isVisible, choosedUser, closeModal }) => {
  const{globalState, handleGlobalState} = useContext(Context);


  if(choosedUser != undefined ){
    if(choosedUser.email){

      useEffect(()=>{
        globalState.userList.forEach((user) => {
          if(user.email === choosedUser.email){
            choosedUser = user;
          }
        })

      }, [Object.values(globalState)])

  
    const hasTrueDisease = Object.values(choosedUser.diseases).some(disease => disease === true);

      // console.log("****************SELECTED USER******************")
      // console.log(user)
      
      let linkForBackground;
      
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

          default:
            linkForBackground=require('../assets/white.jpeg'); 


        }

        const restore = () => {
          socket.emit('restoreStamina', choosedUser.email);
        };

      

      return (
        <Modal isVisible={isVisible}>
          <ModalContainer>
          <BackgroundImage source={linkForBackground}>

          <ScrollView>

            <View>

              <TouchableOpacity onPress={closeModal}>
                  <ModalText>X </ModalText>
                </TouchableOpacity>

              <FirstFace user={choosedUser}/> 
              <Divider /> 
              <ProfileInfo user={choosedUser}/>
              <Divider /> 
              <Stats user={choosedUser}/>




              {globalState.user.rol === "Mortimer" && hasTrueDisease===true && choosedUser &&(
                  <View style={{ top: 0 }}>
                    <CureDisButton onPress={false}>
                        <CureDisButtonText>Cure disease</CureDisButtonText>
                    </CureDisButton>
                    {choosedUser.characterStats.stamina <=20 && (
                      <CureButton onPress={restore}>
                          <CureButtonText >Recuperar</CureButtonText>
                      </CureButton>

                    )}
                  </View>
                )}

                  

            </View>
            </ScrollView>
            </BackgroundImage>


          </ModalContainer>
        </Modal>
      );
    }
  }
};


export default UserDetail;
