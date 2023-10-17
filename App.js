import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import  Header  from './components/Header';
import SplashScreen from './components/SplashScreen';
import MyStack from './components/MyStack.js';
import Profile from './screens/Profile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";


const Tab = createMaterialTopTabNavigator();



const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      console.log("Enters init function")
    const value = "User data";

    storeData(value);
    const user = getData()
    console.log(user);
    
  };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);


  return (
    <NavigationContainer>
      

      <MyStack />

    </NavigationContainer>
  );

}
export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    // saving error
  }
};

  console.log("set passed")
  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};