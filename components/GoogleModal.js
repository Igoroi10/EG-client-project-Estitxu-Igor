import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { View, Text, Image } from 'react-native';
import styled from "styled-components/native";
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

Modal.setAppElement('#yourAppElement');

function GoogleSignIn() {
  const [loadingGoogle, setGoogleLoad] = useEffect(false)

  const googlePressButton = () => {
    setGoogleLoad = true
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
  
  }

    return (
    <>
      { !loadingGoogle &&
        <GoogleButton title="Google Sign-In" onPress={googlePressButton()}/>
      }
      {loadingGoogle && 
        <GoogleButton class="fa fa-spinner"/>
      }
    </>
      

    

    );
  }
  
  async function onGoogleButtonPress() {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      console.log("Token HERE: " + idToken)
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }
  

const GoogleModal = ({logStatus}) =>{
            return(
                <ModalTemplate
                visible = {logStatus?false:true}>
                    <GoogleSignIn />
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
 align-items: center;
 justify-content: center;
`

export default GoogleModal