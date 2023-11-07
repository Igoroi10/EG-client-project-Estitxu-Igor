import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'; // Importa TouchableOpacity
import { getData } from "../helpers/localStorage";
import axios from "axios";

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

    const [towerState, setTowerState] = useState(null);
    const [potionState, setPotion] = useState(null);

    const checkTowerAccess = async () => {
        
        const data = await getData();
        const user = data[0];

        
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/users/')
        const responseData = response.data.data;
        const currentUserData = responseData.filter((element) => element.email == user.email)
        const currentUser = currentUserData[0]

        console.log(currentUser);
        console.log(currentUser.email)

        if(currentUser.towerAccess){
            accesText = "ACCESO GARANTIZADO, BIENVENIDO "+ currentUser.rol+" "+currentUser.name
            setTowerState('corruptScroll')
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
