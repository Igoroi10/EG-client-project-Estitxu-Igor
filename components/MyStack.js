import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Potions from '../screens/Potions'


const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile}  />
      <Stack.Screen name="Potions" component={Potions}  />
    </Stack.Navigator>
  );
}