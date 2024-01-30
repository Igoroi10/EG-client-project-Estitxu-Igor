import React from "react";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Container = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
`
const Room = styled.TouchableOpacity``;

const RoomContent = styled.View`
    width: 300px;
    height: 100px;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 30px;
    padding: 0 15px;
    background-color: grey;
`


const Text = styled.Text`
    color: black;
    font-size: 30px;
    padding-left: 6px;
`

const MainButtons = (props) => {
    return(
        <Container>
            <Room onPress={props.onPress}>
                    <RoomContent>
                        <Icon name={props.iconName} size={50} color="black" />
                        <Text>{props.label}</Text>
                    </RoomContent>
                </Room>
        </Container>
    )
}
export default MainButtons