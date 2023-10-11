import React from "react";
import styled from 'styled-components/native'
import MainButtons from "../components/MainButtons";
import Header from "../components/Header";
import { useNavigation } from '@react-navigation/native';

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


const Home = () => {
    const navigation = useNavigation();
    return (
            <>
            <Header/>
            <View>
                <ButtonsContainer>
                <MainButtons  label="Profile" iconName="account" onPress={() => navigation.navigate('Profile')}/>

                <MainButtons label="Create Potions" iconName="glass-mug-variant"/>
                </ButtonsContainer>
            </View>
            </>
    )
}
export default Home