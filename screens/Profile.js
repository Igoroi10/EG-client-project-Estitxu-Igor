import React from 'react'
import styled from 'styled-components/native'

import FirstFace from '../components/FirstFace';
import ProfileInfo from '../components/ProfileInfo';
import Stats from '../components/Stats';
import Diseases from '../components/Diseases';



const View = styled.View`
    flex: 1;
    align-items: center;
`


const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;


const Profile = ({user}) => {
    console.log("USER ON PROFILE " + user)
    return (
        <View>
                <FirstFace user={user}/>
                <Divider /> 
                <ProfileInfo user={user}/>
                <Divider /> 
                <Stats user={user}/>
                <Divider /> 
                <Diseases user={user}/>
        </View>
    )
}

export default Profile
