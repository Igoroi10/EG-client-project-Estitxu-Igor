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

const Tab = createMaterialTopTabNavigator();

GoogleSignin.configure({
  webClientId: '191142773304-svg8ajvir2075qjot6q18b7bhq45e4ps.apps.googleusercontent.com',
});

const App = () => {
  const [logState, setLogged] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks

      const user = await getData();


      if (user !== null) {
        setLogged(true);
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
      asignRol(user, tabScreens);    }

    screenCharge();
  },[user])

  asignRol(user, tabScreens)


  return (
    <NavigationContainer>
      <GoogleModal logStatus={logState} setMethod={setUser}/>
      <StandardModal />
      <Tab.Navigator>
        {tabScreens}

      </Tab.Navigator>
    </NavigationContainer>
  );
  
};

export default App;