import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import  Header  from './components/Header';
import SplashScreen from './components/SplashScreen';
import MyStack from './components/MyStack.js';


const App = () => {
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