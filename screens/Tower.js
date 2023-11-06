import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'; // Importa TouchableOpacity
import { getData } from "../helpers/localStorage";


const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: white;
`

const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    `


const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;
const Button = styled.TouchableOpacity`
  background-color: grey;
  padding: 10px 20px;
  border-radius: 10px;
`;


const Tower = () => {
    const checkTowerAccess = async () => {
        const data = await getData();
        const user = data[0]
        
        if(user.towerAccess){
            accesText = "ACCESO GARANTIZADO, BIENVENIDO "+ user.rol+" "+user.name
            //ACCEDER A PANTALLA PERGAMINO
        }
        else{
            accesText = "ACCESO DENEGADO, FUERA DE AQUÍ!"
        }
        alert(accesText)
    }

    return (
        <ImageBackground
            source={require('../assets/tower.png')}
        >
            <View>
                <Button onPress={checkTowerAccess}>
                    <ButtonText>ACCEDER AL TORREÓN</ButtonText>
                </Button>
            </View>
        </ImageBackground>
    )
}

export default Tower
