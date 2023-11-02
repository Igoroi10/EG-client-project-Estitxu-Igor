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

const GoogleModal = ({logStatus}) =>{
  const [userLoaded, setUserLoad] = useState(logStatus?false:true)
  const [loading, setLoading] = useState(false)

  
  async function onGoogleButtonPress() {
    setLoading(true)
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    console.log("******************PLAY SERVICE CHECKED******************")
    const { idToken } = await GoogleSignin.signIn();
    console.log("Token HERE: " + idToken)
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log("*****************GOOGLE CREDENTIAL*************************");
    console.log(googleCredential)
  
    // Sign-in the user with the credential
    const signInWithCredential = await auth().signInWithCredential(googleCredential,);
    console.log("**********************SIGN IN W CREDENTIAL******************")
    console.log(signInWithCredential)
  
    //Get the token from current user
    const idTokenResult = await auth().currentUser.getIdTokenResult();
    console.log('********************************filtered token**************************')
    console.log(idTokenResult);
  
    console.log()
    //validate user token
    const decodedUser = await axios.post('https://fly-eg-production.fly.dev/api/users/', {
      token: idTokenResult.token
    })

    
    console.log('******************DECODED USER AT RETURN*******************')
    console.log(decodedUser.data.data)


    await storeData(decodedUser.data.data)
    setUserLoad(true)
    
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