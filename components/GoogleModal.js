import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import styled from "styled-components/native";
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios'
import{storeData} from '../helpers/localStorage'

Modal.setAppElement('#yourAppElement');

const GoogleModal = ({logStatus, setMethod, setUser}) =>{
  const [userLoaded, setUserLoad] = useState(logStatus?false:true)
  const [loading, setLoading] = useState(false)

  
  async function onGoogleButtonPress() {
    setLoading(true)
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  
    // Sign-in the user with the credential
    const signInWithCredential = await auth().signInWithCredential(googleCredential,);
    console.log("**********************SIGN IN W CREDENTIAL******************")
    console.log(signInWithCredential)
  
    //Get the token from current user
    const idTokenResult = await auth().currentUser.getIdTokenResult();

  
    //validate user token

    // const decodedUser = await axios.post('http://192.168.1.168:3000/api/users/', {
    const decodedUser = await axios.post('https://fly-eg-staging.fly.dev/api/users/', {

      token: idTokenResult.token
    })

    


    await storeData(decodedUser.data.data)
    setUserLoad(true)
    setMethod(decodedUser.data.data[0].rol)
    setUser(decodedUser.data.data[0])
    
  }



  return(
    <ModalTemplate visible = {userLoaded||logStatus?false:true }>
      <GoogleButton title="Google Sign-In"  onPress={onGoogleButtonPress} disabled={loading}>
        {loading?<ActivityIndicator/> : <Text>Sign - In</Text>}
      </GoogleButton>
    </ModalTemplate>
  )
}

  


const ModalTemplate = styled.Modal`
  position: absolute;
  width: 100%;
  height: 100%;
`

const  GoogleButton= styled.Button`
 width: 42px;
 height: 42px;
 border-radius: 10px;
 margin-left: 16px;
 background: #EEEEEE;
 margin-top: 40%; 
 align-items: center;
 justify-content: center;
`

export default GoogleModal