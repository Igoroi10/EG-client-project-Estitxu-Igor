import 'react-native-gesture-handler';
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
import IstvanScreen from './screens/IstvanScreen.js';
import Villano from './screens/VillanoScreen.js'

const Tab = createMaterialTopTabNavigator();

GoogleSignin.configure({
  webClientId: '191142773304-svg8ajvir2075qjot6q18b7bhq45e4ps.apps.googleusercontent.com',
});

const App = () => {
  const [logState, setLogged] = useState([]);
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks

      const user = await getData();
      console.log('****************LOG STATE WITHOUT USER*******************');
      console.log(user );

      if (user !== null) {
        setLogged(true);
        setUserRole(user[0].rol);

      } else {
        setLogged(false);
      }
      
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  const tabScreens = [];

  //Pantallas JACOB
  if (userRole === "Jacob") {
    tabScreens.push(
      <Tab.Screen key="Home" name="Home" component={MyStack} />,
      <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />
    );
  }

  //Pantallas ACÓLITO
  else if (userRole === "Acolito") {
    tabScreens.push(
      <Tab.Screen key="Home" name="Home" component={MyStack} />,
      <Tab.Screen key="Admin" name="Admin" component={Admin} />,
      <Tab.Screen key="Profile" name="Profile" component={Profile} />,
      <Tab.Screen key="Potions" name="Potions" component={Potions} />,
      <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
      <Tab.Screen key="TOWER" name="TOWER" component={Tower} />

    );
  }
    else if(userRole === "Istvan") {
    tabScreens.push(
      <Tab.Screen key="Istvan" name="Istvan" component={IstvanScreen} />,

    )
  }

  else if(userRole === "Villano") {
    tabScreens.push(
      <Tab.Screen key="Villano" name="Villano" component={Villano} />,

    )
  }
  


  else{
    tabScreens.push(
      <Tab.Screen key="Home" name="Home" component={MyStack} />
    )

  }

  return (
    <NavigationContainer>
      <GoogleModal logStatus={logState} />
      <StandardModal />
      <Tab.Navigator>
        {tabScreens}

      </Tab.Navigator>
    </NavigationContainer>
  );
  
};

export default App;
