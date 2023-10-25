import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { View, Text, Image } from 'react-native';
import styled from "styled-components/native";
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from "axios";

Modal.setAppElement('#yourAppElement');

function GoogleSignIn() {
  const [loadingGoogle, setGoogleLoad] = useState(true)
  
  console.log("loading init: " + loadingGoogle)
  useEffect(() => {
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'))

  }, [loadingGoogle]);

  return (
    <>
      {loadingGoogle &&
        <GoogleButton title="Google Sign-In" onPress={setGoogleLoad(false)}/>
      }
      {!loadingGoogle && 
        <GoogleButton title="Google Sign-In" disabled/>
      }
    </>
  );
}
  
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  console.log("******************PLAY SERVICE CHECKED******************")
  const { idToken } = await GoogleSignin.signIn();
  console.log("Token HERE: " + idToken)
  // const res = await axios.post("http://localhost:3000/api/user", {idToken});

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log("*****************GOOGLE CREDENTIAL*************************");
  console.log(googleCredential)

  // Sign-in the user with the credential
  const signInWithCredential = auth().signInWithCredential(googleCredential,);
  console.log("**********************SIGN IN W CREDENTIAL******************")
  console.log(signInWithCredential)

  //Get the token from current user
  const idTokenResult = await auth().currentUser.getIdTokenResult();
  console.log('********************************filtered token**************************')
  console.log(idTokenResult);


  //validate user token
  axios.post('http://localhost:3000/api/user'), {
    data: idTokenResult
  }
  .thenResponse

  console.log("***************************Token sent*********************")

}

// /validate token
// app.post



// admin.auth.verifyToken










const GoogleModal = ({logStatus}) =>{
  return(
    <ModalTemplate visible = {logStatus?false:true}>
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
 margin-top: 40%; 
 align-items: center;
 justify-content: center;
`

export default GoogleModal