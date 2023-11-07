import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyStack from '../components/MyStack.js';
import Profile from '../screens/Profile';
import Potions from '../screens/Potions';
import QRCodeGeneratorScreen from '../screens/QR.js';
import Tower from '../screens/Tower.js';
import Admin from '../screens/Admin.js';
import IstvanScreen from '../screens/IstvanScreen.js';
import Villano from '../screens/VillanoScreen.js'

const Tab = createMaterialTopTabNavigator();



const asignRol = async (userRole, tabScreens) => {
    console.log('**************** tabScreen STATE ****************')
    console.log(tabScreens)
    console.log(userRole)

    tabScreens.splice(0)
    console.log('***** rol asign ********')
    //Pantallas JACOB
    if (userRole === "Jacob") {
        console.log('JACOB SCREEN')
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />
        );
        }
    
        //Pantallas ACÓLITO
        else if (userRole === "Acolito") {
        console.log('ACOLITO SCREEN') //NOT WORKING
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="Profile" name="Profile" component={Profile} />,
            <Tab.Screen key="Potions" name="Potions" component={Potions} />,
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
            <Tab.Screen key="TOWER" name="TOWER" component={Tower} />
        );
        }
        else if(userRole === "Istvan") {
        console.log('ISTVAN SCREEN') //WORKING
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="Istvan" name="Istvan" component={IstvanScreen} />
        )
        }
        else if(userRole === "Mortimer") {
        console.log('MORTI SCREEN') //Working
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="Mortimer" name="Mortimer" component={Admin} />
        )
        }
        else if(userRole === "Villano") {
        console.log('VILLAIN SCREEN') //WORKING
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="Villano" name="Villano" component={Villano} />
        )
        }
    
        else{
        console.log('DEFAULT SCREEN') //WORKING
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />
        )
    
        }

        console.log('****************TAB SCREEN AFTER SCREEN HANDLER****************')
        console.log(tabScreens)
}

export {asignRol};