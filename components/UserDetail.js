import React, { useState, useEffect }  from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Text, View, TouchableOpacity , ScrollView} from 'react-native';
import Profile from '../screens/Profile'
import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Slider from '@react-native-community/slider';
import { storeData, getData } from '../helpers/localStorage';




const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FFFFFF;
  padding: 20px;
`;
 
const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 10px;
  text-align: center;
  bottom: 10px;
`;
const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`;
const ButtonRed = styled.TouchableOpacity`
  background-color: red;
  padding: 10px 20px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  position: absolute;
`;

const ButtonGreen = styled.TouchableOpacity`
  background-color: green;
  padding: 10px 20px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  position: absolute;
`;

const CureButton = styled.TouchableOpacity`
  background-color: purple;
  padding: 10px 20px;
  border-radius: 10px;
  border-color: black;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  left: 65px;
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

const UserDetail = ({ isVisible, user, closeModal }) => {
  const [sliderValue, setSliderValue] = useState(0); 
  const [sliderValueMoney, setSliderValueMoney] = useState(0); 
  const [actualUserRole, setActualUserRole] = useState(null);

  useEffect(() => {
    if (user !== null) {
      async function fetchData() {
        const data = await getData();
        const actualUser = data[0];
        console.log('****************ROLE******************');
        console.log(actualUser.rol);
        setActualUserRole(actualUser.rol);
      }

      fetchData();
    }
  }, [user]);

  
  if(user !== null) {
    
    console.log("****************SELECTED USER******************")
    console.log(user)
    const hasTrueDisease = Object.values(user.diseases).some(disease => disease === true);
    
    return (
      <Modal isVisible={isVisible}>
        <ModalContainer>
        <ScrollView>

          <View>

          <FirstFace user={user}/>
          <Divider /> 
          <ProfileInfo user={user}/>
          <Divider /> 
          <Stats user={user}/>

          {(actualUserRole === "Villano" || actualUserRole === "Istvan") && (
              <View >
                <ButtonRed style={{top: 500}}>
                    <ButtonText>-</ButtonText>
                </ButtonRed>
                <ButtonGreen style={{top: 500 , left: 280}}>
                    <ButtonText>+</ButtonText>
                </ButtonGreen>
      
                <SliderText> HP: {Math.floor(sliderValue)} </SliderText>

                <Slider
                  style={{width: 225, height: 40, left: 50, top: -10}}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => setSliderValue(value)}
                />
                <ButtonRed style={{top: 565}}>
                    <ButtonText>-</ButtonText>
                </ButtonRed>
                <ButtonGreen style={{top: 565 , left: 280}}>
                    <ButtonText>+</ButtonText>
                </ButtonGreen>

                

                <SliderText> Money: {Math.floor(sliderValueMoney)} </SliderText>
                <Slider
                  style={{width: 225, height: 40, left: 50, top: -10}}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => setSliderValueMoney(value)}
                />
              </View>
            )}


        {actualUserRole === "Mortimer" && hasTrueDisease===true && (
            <View style={{ top: 0 }}>
              <CureButton >
                  <CureButtonText>Cure disease</CureButtonText>
              </CureButton>
            </View>
          )}

                
            <TouchableOpacity onPress={closeModal}>
              <ModalText>Cerrar </ModalText>
            </TouchableOpacity>
          </View>
          </ScrollView>

        </ModalContainer>
      </Modal>
    );
  } else {
    return null;
  }
};


export default UserDetail;
