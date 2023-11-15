import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyStack from '../components/MyStack.js';
import Profile from '../screens/Profile';
import Potions from '../screens/Potions';
import QRCodeGeneratorScreen from '../screens/QR.js';
import Tower from '../screens/Tower.js';
import Admin from '../screens/Admin.js';
import IstvanScreen from '../screens/IstvanScreen.js';
import Villano from '../screens/VillanoScreen.js'
import Map2 from '../screens/Map2.js'

const Tab = createMaterialTopTabNavigator();



const asignRol = async (userRole, tabScreens, user) => {
    // let userRole;
    // if(user !== null){
    //     // userRole= user[0].rol;
    // }
    // else
    //     userRole = null;

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
            <Tab.Screen key="MAP" name="MAP" component={Map2} />,
            //<Tab.Screen key="Potions" name="Potions" component={Potions} />,
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
            <Tab.Screen key="TOWER" name="TOWER" component={Tower} />,
        );
    }
    else if(userRole === "Istvan") {
        tabScreens.push(
            <Tab.Screen key="Istvan" name="Istvan">
                {() => <IstvanScreen user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>  
        )
    }
    else if(userRole === "Mortimer") {
        tabScreens.push(
            <Tab.Screen key="Mortimer" name="Mortimer">
                {() => <Admin user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>     
        )
    }
    else if(userRole === "Villano") {
        tabScreens.push(
            <Tab.Screen key="Villano" name="Villano">
                {() => <Villano user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>          
        )
    }

    else{
        tabScreens.push(
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>          )
    }

}

export {asignRol};