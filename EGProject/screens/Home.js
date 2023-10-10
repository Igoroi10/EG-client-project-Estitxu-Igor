import React from "react";
import { Text } from 'react-native';
import styled from 'styled-components/native'
import { ScrollView } from "react-native"
import MainButtons from "../components/MainButtons";
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center
`

const ButtonsContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    height: 30%;
`

const Separator = styled.View`
    width: 100%;
`
const Home = () => {
    return (
            <>
            <Header/>
            <View>
                <ButtonsContainer>
                <MainButtons  label="Profile" iconName="account"/>

                <MainButtons label="Create Potions" iconName="glass-mug-variant"/>
                </ButtonsContainer>
            </View>
            </>
    )
}
export default Home