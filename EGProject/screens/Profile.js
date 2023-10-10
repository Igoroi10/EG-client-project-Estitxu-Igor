import React from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'

import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';


const View = styled.View`
    flex: 1;
    align-items: center;
`


const Text = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;
    padding-top: 75px;
    text-align: center;
    color: red;
`

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;


const Profile = () => {
    return (
        <View>
                <FirstFace />
                <Divider /> 
                <ProfileInfo />
                <Divider /> 
        </View>
    )
}

export default Profile
