import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MyStack from './components/MyStack.js';
import GoogleModal from './components/GoogleModal.js'
import StandardModal from './components/Modal.js'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";


const Tab = createMaterialTopTabNavigator();



const App = () => {

  const [pageState, setPage] = useState(['mainPage'])

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    const value = null;
                    // { name: "name",
                    // email: "mail",
                    // atributes: {strength: "strength",
                    //             stamina: "0",
                    //             poisoned: true }}
    await storeData(value);
    const user = await getData()

    if(user === null){
      setPage(['googlePage'])
    }
    else{
      setPage(['mainPage'])
    }
    
  };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <NavigationContainer>
      <GoogleModal state = {pageState}/>
      <StandardModal/>
      <MyStack />
    </NavigationContainer>
  );

}
export default App


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue); 
  } catch (e) {
    console.log("error set")
  }
};
  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error get")
  }
};

