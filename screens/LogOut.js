import React from "react";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import MainButtons from "../components/MainButtons";
import { storeData, getData } from '../helpers/localStorage';


const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center
`

const LogOut = () => {
    const navigation = useNavigation();
    const reestoreData = async () => {
        await storeData(null)
      };

    return (
            <View>
                <MainButtons label="Delete storage"  onPress={() => reestoreData()}/>
            </View>
    )
}

export default LogOut;