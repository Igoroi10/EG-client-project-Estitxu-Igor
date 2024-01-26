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

import PotionsModal from './PotionsModal';






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
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  left: 25%;
  top: 0px;

`;
const CureDisButtonText = styled.Text`
    color: white;
    font-size: 15px;
    text-align: center;

`;

const CureButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px 20px;
  border-radius: 10px;
  border-color: black;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  left: 25%;
  top: 5px;
`;

const DiseasedButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const DiseaseButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px 20px;
  border-radius: 10px;
  border-color: black;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  left: 26%;
  top: -10px;
  margin-top: 5px;

`;


const CureButtonText = styled.Text`
    color: white;
    font-size: 15px;
    text-align: center;

`;
const DiseasesText = styled.Text`
    color: white;
    font-size: 15px;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    top: -10px;
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

const Buttons = styled.View`
  flex-direction: row;
`

const UserDetail = ({ isVisible, choosedUser, closeModal, num }) => {
  const{globalState, handleGlobalState} = useContext(Context);
  const [selectedUser, setSelectedUser] = useState(choosedUser);
  const [hasTrueDisease, isHasTrueDisease] = useState(false);

  const [isActiveButton, setIsActiveButton] = useState(false);
  const [createPotionModal, setCreatePotionModal] = useState(false);
  const [potionState, setPotion] = useState("start");

  const diseases = ["marrow_apocalypse", "epic_weakness", "rotting_plague", "ethazium"];

  let textOfDiseases = "Diseases: ";
  diseases.forEach(name => {
    if(selectedUser){
      if(selectedUser.diseases[name] === true){
        textOfDiseases += name + ", ";
      }
    }
  })

  useEffect(() => {
    diseases.forEach(name => {
      if(selectedUser){
        if(selectedUser.diseases[name] === true){
          textOfDiseases += name + ", ";
        }
      }
  
    })

  }, [globalState.userList])

    useEffect(() => {
      // console.log("*****************Enters in USEEFFECT**********************")
      if(globalState.userList[num]){

        // console.log("***********************STAMINA***********************")
        // console.log(globalState.userList[num].characterStats.stamina)
        setSelectedUser(globalState.userList[num])
      }
      // console.log("·····················CHANGED USER·······················")
      // console.log(globalState.stamina)

      setIsActiveButton(true)
    }, [Object.values(globalState.userList)])

    useEffect(() => {
      if(selectedUser){
        if(selectedUser.diseases.marrow_apocalypse || selectedUser.diseases.epic_weakness || selectedUser.diseases.ethazium || selectedUser.diseases.rotting_plague){

          isHasTrueDisease(true);
        }
        else{
          isHasTrueDisease(false);

        }
      }


     }, [selectedUser])
 


      
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
          setIsActiveButton(false)
          socket.emit('restoreStamina', choosedUser.email);
        };


        const applyDisease = (diseaseId) => {
            console.log(selectedUser.diseases[diseaseId])
            selectedUser.diseases.marrow_apocalypse = true;
            const data = {
              "email": selectedUser.email,
              "apply": true,
              "diseaseId": diseaseId
            }
            socket.emit('sickUser', data);
  
          
        }

        const openPotionModal = () => {
          setCreatePotionModal("potionCreation")
          console.log("ERFGHJ")
        }

        const closePotionModal = () => {
          setCreatePotionModal(false)

        }

      

      return (
        <Modal isVisible={isVisible}>
          <ModalContainer>
          <PotionsModal 
              towerStatus={createPotionModal}
              setTowerStatus ={setCreatePotionModal}
              potionState={potionState}
              setPotionCreated ={setPotion}
              user={selectedUser}
            />
            
          <BackgroundImage source={linkForBackground}>

          <ScrollView>

            <View>

              <TouchableOpacity onPress={closeModal}>
                  <ModalText>X </ModalText>
                </TouchableOpacity>

              <FirstFace user={selectedUser}/> 
              <Divider /> 
              <ProfileInfo user={selectedUser}/>
              <Divider /> 
              <Stats user={selectedUser}/>

              {globalState.user.rol === "Mortimer" &&(
                  <View style={{ top: 0, padding: 20}}>

                  {hasTrueDisease &&(
                    <DiseasesText>
                      {textOfDiseases} 
                    </DiseasesText>
                  )}
                    {hasTrueDisease === true&& (
                    <CureDisButton onPress={() => openPotionModal()}>
                        <CureDisButtonText>Cure disease</CureDisButtonText>
                    </CureDisButton>
                    )}
                    {selectedUser && (
                      <>
                      {selectedUser.characterStats.stamina <= 20 && isActiveButton &&(
                        <CureButton onPress={() => restore()}>
                            <CureButtonText >Recuperar</CureButtonText>
                        </CureButton>

                      )}
                    </>
                    )}
                  </View>
              )}
                {(globalState.user.rol === "Villano" )&&(
                  <Buttons style={{ top: 0, height: 100}}>
                    {!selectedUser.diseases.marrow_apocalypse && (
                      <DiseaseButton onPress={() => applyDisease("marrow_apocalypse")}>
                        <CureDisButtonText>apocalypse</CureDisButtonText>
                      </DiseaseButton>
                    )}
                    {!selectedUser.diseases.epic_weakness && (
                      <DiseaseButton onPress={() => applyDisease("epic_weakness")}>
                        <CureDisButtonText>weakness</CureDisButtonText>
                      </DiseaseButton>
                    )}

                    {!selectedUser.diseases.rotting_plague && (
                      <DiseaseButton onPress={() => applyDisease("rotting_plague")}>
                        <CureDisButtonText>plague</CureDisButtonText>
                      </DiseaseButton>
                    )}

                  </Buttons>
                  
                )}
                
                {/* <DiseaseButton onPress={applyDisease("marrow_apocalypse")}>
                    <CureDisButtonText>Cure disease</CureDisButtonText>
                </DiseaseButton>
                <DiseaseButton onPress={applyDisease("marrow_apocalypse")}>
                    <CureDisButtonText>Cure disease</CureDisButtonText>
                </DiseaseButton> */}


                    

                  

            </View>
            </ScrollView>
            </BackgroundImage>
           

          </ModalContainer>
        </Modal>

      );
   
};


export default UserDetail;
