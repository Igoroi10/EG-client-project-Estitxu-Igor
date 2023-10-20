import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootSplash from "react-native-bootsplash";


import MyStack from './components/MyStack.js';
import GoogleModal from './components/GoogleModal.js'
import StandardModal from './components/Modal.js'


const Tab = createMaterialTopTabNavigator();



const App = () => {

  let logged = false;

  const [logState, setLogged] = useState([]);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    const value =
                    {name: "name",
                    email: "mail",
                    atributes: {strength: "strength",
                                stamina: "0",
                                poisoned: true }}

    await storeData(value);
    const user = await getData()

    if(user !== null){
      setLogged(true)
    }
    else
      setLogged(false)
    
  };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <NavigationContainer>
      <GoogleModal logStatus={logState} />
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

