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

    userCheck(user);
    
  };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  useEffect(modalHandler(pageState), pageState);

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

const userCheck= (value) => {
  
    if(value === null){
      setPage(['googlePage'])
    }
    else{
      setPage(['mainPage'])
    }
}

const modalHandler = (state) =>{
  
  switch(state){
    case 'mainPage':
      //Hide all modals
      break;
    case 'googlePage':
      //Hide all modals + showGoogle
      break;
    //Rest of cases to be implemented in the future
  }
}