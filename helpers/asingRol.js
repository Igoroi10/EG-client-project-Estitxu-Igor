import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Profile from '../screens/Profile';
import QRCodeGeneratorScreen from '../screens/QR.js';
import Tower from '../screens/Tower.js';
import Admin from '../screens/Admin.js';
import IstvanAndVillanoScreen from '../screens/IstvanAndVillanoScreen.js';
import Maps from '../screens/Map.js';
import Guest from '../screens/Guest.js'

const Tab = createMaterialTopTabNavigator();



const asignRol = async (userRole, tabScreens, user) => {

    tabScreens.splice(0)

    //Pantallas JACOB
    if (userRole === "Jacob") {
        tabScreens.push(
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>       
        );
    }
    
        //Pantallas ACÓLITO
    else if (userRole === "Acolito") {
        tabScreens.push(
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
            <Tab.Screen key="TOWER" name="TOWER" component={Tower} />,
            <Tab.Screen key="MAPS" name="MAPS" component={Maps} />,
        );
    }
    else if(userRole === "Istvan") {
        tabScreens.push(
            <Tab.Screen key="Istvan" name="Istvan">
                {() => <IstvanAndVillanoScreen user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>  
        )
    }
    else if(userRole === "Mortimer") {
        tabScreens.push(
            <Tab.Screen key="Mortimer" name="Mortimer">
                {() => <Admin />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="MAPS" name="MAPS" component={Maps} />,
    
        )
    }
    else if(userRole === "Villano") {
        tabScreens.push(
            <Tab.Screen key="Villano" name="Villano">
                {() => <IstvanAndVillanoScreen user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>          
        )
    }

    else{
        tabScreens.push(
            <Tab.Screen key="Guest" name="Guest">
                {() => <Guest  />}
            </Tab.Screen>          )
    }

}

export {asignRol};