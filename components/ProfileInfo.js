import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { storeData, getData } from '../helpers/localStorage';



const Container = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  align-items: left;
  top: -10px;
`;

const NameColumn = styled.View`
  flex: 1;
  justify-content: left;
  align-items: left;
  left: 20px;
`;

const Text = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin: 0 0px;
  padding-top: 0px;
  text-align: left;
  color: white;
  text-shadow: 2px 2px 2px black;
  left: 10px
`

const SliderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0px;
  text-align: left;
  bottom: 0px;
  top: 5px;
  left: 15px

`;



const FirstFace = ({user}) => {
  const [actualUserRole, setActualUserRole] = useState(null);
  const [sliderValueHP, setSliderValueHP] = useState(0); 
  const [sliderValueMoney, setSliderValueMoney] = useState(0); 

  let fixedValueLvL = user.characterMainData.LvL;
 
  useEffect(() => {
    if (user !== null) {
      async function fetchData() {
        const data = await getData();
        const actualUser = data;
        console.log('****************ROLE******************');
        console.log(actualUser.rol);
        setActualUserRole(actualUser.rol);
        setSliderValueHP(user.characterMainData.HP);
        setSliderValueMoney(user.characterMainData.Money);
        fixedValueLvL = user.characterMainData.LvL;
      }

      fetchData();
    }
  }, [user]);

  return (
    <>
    {user &&(
      <Container>
        <NameColumn>
          {actualUserRole === "Mortimer" &&(
            
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left',}}>
                <Text>HP: {sliderValueHP}</Text>
                <View
                  style={{
                    width: (100/100) * 70,
                    height: 20,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    marginTop: 10,
                  }} 
                />
                <View
                  style={{
                    width: (sliderValueHP/100) * 70,
                    height: 20,
                    backgroundColor: 'grey',
                    borderRadius: 3,
                    marginTop: -20,
                  }} 
                />
              </View>
          )}

          {(actualUserRole === "Villano" || actualUserRole === "Istvan") &&(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginTop: 10}}>
              <SliderText style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 2  }}> HP: {Math.floor(sliderValueHP)} </SliderText>

              <Slider
                style={{width: 100, height: 40, left: 0, top: 0}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="white"
                maximumTrackTintColor="white"
                onValueChange={(value) => setSliderValueHP(value)}
                
              />
            </View>
          )}
        </NameColumn>




        <NameColumn>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left',}}>
            <Text>LvL: {fixedValueLvL}</Text>
           
          </View>
        </NameColumn>

        <NameColumn>
          {actualUserRole === "Mortimer" &&(
            
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left',}}>
                <Text style={{marginLeft: -20}}>Money: {sliderValueMoney}</Text>
                <View
                  style={{
                    width: (100/100) * 70,
                    height: 20,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    marginTop: 10,
                    marginLeft:  -5
                  }} 
                />
                <View
                  style={{
                    width: (sliderValueMoney/100) * 70,
                    height: 20,
                    backgroundColor: 'grey',
                    borderRadius: 3,
                    marginTop: -20,
                    marginLeft:  -5

                  }} 
                />
              </View>
          )}
        </NameColumn>

      </Container>
    )}
     
    </>
  );
};

export default FirstFace;
