import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Context } from './AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BootSplash from "react-native-bootsplash";
import { storeData, getData } from './helpers/localStorage';

import GoogleModal from './components/GoogleModal.js';
import StandardModal from './components/Modal.js';
import RestModal from './components/RestModal.js'
import TiredModal from './components/TiredModal.js';

import globalStateModel from './helpers/globalStateModel';

import {asignRol} from './helpers/asingRol';
import socket from './helpers/socket.js'
import SocketListener from './components/SocketListener';

import Toast from 'react-native-toast-message'
import FoundByArtifact from './helpers/FoundByArtifact.js';

import authFetch from './helpers/interceptor.js';
import SickModal from './components/SickModal';


const Tab = createMaterialTopTabNavigator();

GoogleSignin.configure({
  webClientId: '191142773304-svg8ajvir2075qjot6q18b7bhq45e4ps.apps.googleusercontent.com',
});

const App = () => {
  const [globalState, setGlobalState] = useState(globalStateModel);
  const [socketEvent, setSocketEvent] = useState(null)

  const handleGlobalState = (data) => {
    setGlobalState(globalState =>({
      ...globalState,
      ...data
    }))
  }

  //REST OF STATES
  const [logState, setLogged] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks

      const userData = await getData();
      
      console.log("**********************DATA de pruea ***********************")
      // const resp = await authFetch('/artifacts')
      // console.log(resp)

      if (userData !== null) {

        const artifactsData = await authFetch.get('/artifacts', {
          email: userData.email
        });
        const searchState = await authFetch('/search', {
          email: userData.email
        });
        const allUsers = await authFetch('/users', {
          email: userData.email
        });   
        const allObjects = await authFetch('/object', {
          email: userData.email
        });    

        setLogged(true);
        setUserRole(userData.rol);
        setUser(userData);

        console.log("*********************artifactsData**********************++")
        console.log(artifactsData.data)
        console.log("*********************searchState**********************++")
        console.log(searchState.data.data[0])
        console.log("*********************allUsers**********************++")
        console.log(allUsers.data)
        console.log(allUsers.data.data[3])


        console.log("*******************all objects*********************");
        console.log(allObjects.data.data);
        
        FoundByArtifact(allUsers.data.data, artifactsData.data.data);
        
        handleGlobalState({artifacts: artifactsData.data.data});
        handleGlobalState({search: searchState.data.data[0]});
        handleGlobalState({userList: allUsers.data.data});
        handleGlobalState({items: allObjects.data.data});
    

        allUsers.data.data.forEach(el => {
          if(el.name === userData.name)
            handleGlobalState({user: el})
        })

      } else {
        setLogged(false);
      }




      socket.onAny((eventName, ...data) => {
        // console.log('************ SOCKET INCOMING **************')
        // console.log('************ EVENT **************')
        // console.log(eventName)
        // console.log('************ DATA *************')
        // console.log(data[0])
        setSocketEvent({event: eventName, value: data[0]})

        return () => {
          socket.removeAllListeners();
          };
      });

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

  useEffect(()=>{
    // console.log('******* GLOBAL STATE CHANGE **********')
    // console.log(globalState)
  })

  asignRol(userRole, tabScreens, user)



  return (
    <Context.Provider value={{globalState, handleGlobalState}}>
      {socketEvent !== null && (<SocketListener props={socketEvent}/>)}
      <NavigationContainer>
        <GoogleModal logStatus={logState} setMethod={setUserRole} setUser={setUser}/>
        <RestModal />
        <TiredModal />
        <SickModal/>
        <StandardModal />
        <Tab.Navigator>
          {tabScreens}
        </Tab.Navigator>
        <Toast/>
      </NavigationContainer>
    </Context.Provider>
  );

};

export default App;