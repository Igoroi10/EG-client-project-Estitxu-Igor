import React from "react";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center
`
const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  left: 0px;
  top: 0px;

`;




const Mortimer = () => {
    const navigation = useNavigation();
    return (
            <>
            <View>
                <Text>SOY MORTIMER</Text>
            </View>
            </>
    )
}
export default Mortimer