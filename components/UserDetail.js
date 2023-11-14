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

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const UserDetail = ({ isVisible, user, closeModal }) => {
  const [sliderValue, setSliderValue] = useState(0); 
  const [sliderValueMoney, setSliderValueMoney] = useState(0); 
  const [actualUserRole, setActualUserRole] = useState(null);

  useEffect(() => {
    if (user !== null) {
      async function fetchData() {
        const data = await getData();
        const actualUser = data;
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
    
    let linkForBackground;
    
      switch(actualUserRole){
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

    

    return (
      <Modal isVisible={isVisible}>
        <ModalContainer>
        <BackgroundImage source={linkForBackground}>

        <ScrollView>

          <View>

            <TouchableOpacity onPress={closeModal}>
                <ModalText>X </ModalText>
              </TouchableOpacity>


            <FirstFace user={user}/>
            <Divider /> 
            <ProfileInfo user={user}/>
            <Divider /> 
            <Stats user={user}/>

            {(actualUserRole === "Villano" || actualUserRole === "Istvan") && (
                <View >

        
                  <SliderText style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 2  }}> HP: {Math.floor(sliderValue)} </SliderText>

                  <Slider
                    style={{width: 225, height: 40, left: 50, top: -10}}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="white"
                    onValueChange={(value) => setSliderValue(value)}
                    
                  />


                  

                  <SliderText style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 2 }}> Money: {Math.floor(sliderValueMoney)} </SliderText>
                  <Slider
                    style={{width: 225, height: 40, left: 50, top: -10}}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="white"
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

                

          </View>
          </ScrollView>
          </BackgroundImage>


        </ModalContainer>
      </Modal>
    );
  } else {
    return null;
  }
};


export default UserDetail;
