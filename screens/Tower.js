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

const Tower = () => {
    const checkTowerAccess = async () => {
        const user = await getData();
        const towerAccess = true;
        let accesText = "";

        if(towerAccess){
            accesText = "ACCESO GARANTIZADO, BIENVENIDO ACÓLITO"
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
                <TouchableOpacity onPress={checkTowerAccess}>
                    <Text>
                    ********test********
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Tower
