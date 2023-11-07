import React from "react";
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { getData } from "../helpers/localStorage";
import axios from "axios";
import Toast from 'react-native-toast-message'; // Import Toast from react-native-toast-message

import PotionsModal from "../components/PotionsModal";
import cleanScrollModal from "../components/cleanScrollModal";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: white;
`;

const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

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

    const [towerState, setTowerState] = useState(null);
    const [potionState, setPotion] = useState(null);

    const checkTowerAccess = async () => {
        const data = await getData();
        const user = data[0];

        const response = await axios.get('https://fly-eg-staging.fly.dev/api/users/');
        const responseData = response.data.data;
        const currentUserData = responseData.filter((element) => element.email === user.email);
        const currentUser = currentUserData[0];

        if (currentUser.towerAccess) {
            const accesText = "ACCESO GARANTIZADO, BIENVENIDO " + currentUser.rol + " " + currentUser.name;
            setTowerState('corruptScroll')
            Toast.show({
                type: 'success', // Toast type
                position: 'bottom', // Toast position
                text1: 'Acceso al Torreón', // Title
                text2: accesText, // Message
            });
            
            // ACCEDER A PANTALLA PERGAMINO
        } else {
            const accesText = "ACCESO DENEGADO, FUERA DE AQUÍ!";
            Toast.show({
                type: 'error', // Toast type
                position: 'bottom', // Toast position
                text1: 'Acceso al Torreón', // Title
                text2: accesText, // Message
            });
        }
    }

    return (
        <ImageBackground
            source={require('../assets/tower.png')}
        >
            <View>
                <Button onPress={checkTowerAccess}>
                    <ButtonText>ACCEDER AL TORREÓN</ButtonText>
                </Button>
                <PotionsModal towerStatus={towerState} setTowerStatus={setTowerState} potionStatus={potionState} setPotionCreated={setPotion}/>
                
                <cleanScrollModal potionStatus={potionState}/>
            </View>
        </ImageBackground>
    )
}

export default Tower;
