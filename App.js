import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BootSplash from "react-native-bootsplash";
import { storeData, getData } from './helpers/localStorage';
import MyStack from './components/MyStack.js';
import GoogleModal from './components/GoogleModal.js';
import StandardModal from './components/Modal.js';
import Profile from './screens/Profile';
import Potions from './screens/Potions';
import QRCodeGeneratorScreen from './screens/QR.js';
import Tower from './screens/Tower.js';
import Admin from './screens/Admin.js';
import QRscanner from './components/QRscanner'

const Tab = createMaterialTopTabNavigator();

GoogleSignin.configure({
  webClientId: '191142773304-svg8ajvir2075qjot6q18b7bhq45e4ps.apps.googleusercontent.com',
});

const App = () => {
  const [logState, setLogged] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const userData = await getData();
      console.log('****************LOG STATE WITHOUT USER*******************');
      console.log(userData);

      if (userData !== null) {
        setLogged(true);
        setUser(userData);
      } else {
        setLogged(false);
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <NavigationContainer>
      <GoogleModal logStatus={logState} />
      <StandardModal />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="Admin" component={Admin} />
        {user !== null && user.rol === "Acolito" &&( // Comprueba si user no es nulo
          <Tab.Screen
            name="Profile"
            component={() => <Profile user={user} />}
          />
        )}
        <Tab.Screen name="Potions" component={Potions} />
        <Tab.Screen name="QR" component={QRCodeGeneratorScreen} />
        <Tab.Screen name="TOWER" component={Tower} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
