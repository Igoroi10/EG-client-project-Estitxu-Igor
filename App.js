import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BootSplash from "react-native-bootsplash";
import { storeData, getData } from './helpers/localStorage';

import GoogleModal from './components/GoogleModal.js';
import StandardModal from './components/Modal.js';

import {asignRol} from './helpers/asingRol';

import Toast from 'react-native-toast-message'

const Tab = createMaterialTopTabNavigator();

GoogleSignin.configure({
  webClientId: '191142773304-svg8ajvir2075qjot6q18b7bhq45e4ps.apps.googleusercontent.com',
});

const App = () => {
  const [logState, setLogged] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks

      const user = await getData();


      if (user !== null) {
        setLogged(true);
        setUserRole(user[0].rol);
        setUser(user[0]);

      } else {
        setLogged(false);
      }
      
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  const tabScreens = [];
  
  useEffect(() => {
    const screenCharge = async() => {
      asignRol(userRole, tabScreens, user)
    }

    screenCharge();
  },[userRole, user])

  asignRol(userRole, tabScreens, user)


  return (
    
    <NavigationContainer>
      <GoogleModal logStatus={logState} setMethod={setUserRole} setUser={setUser}/>
      <StandardModal />
      <Tab.Navigator>
        {tabScreens}

      </Tab.Navigator>
      <Toast/>
    </NavigationContainer>
     
  );
  
};

export default App;