import React from "react";
import styled from 'styled-components/native'
import MainButtons from "../components/MainButtons";
import Header from "../components/Header";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';




function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
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


const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center
`

const ButtonsContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    height: 30%;
`


const Home = () => {
    const navigation = useNavigation();
    return (
            <>
            <Header/>
            <View>
                <ButtonsContainer>
                    <GoogleSignIn />
                <MainButtons  label="Profile" iconName="account" onPress={() => navigation.navigate('Profile')}/>

                <MainButtons label="Create Potions" iconName="glass-mug-variant"/>
                </ButtonsContainer>
            </View>
            </>
    )
}
export default Home