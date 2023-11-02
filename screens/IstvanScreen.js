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




const Istvan = () => {
    const navigation = useNavigation();
    return (
            <>
            <View>
                <Text>SOY ISTVAN</Text>
            </View>
            </>
    )
}
export default Istvan