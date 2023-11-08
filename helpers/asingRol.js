import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyStack from '../components/MyStack.js';
import Profile from '../screens/Profile';
import Potions from '../screens/Potions';
import QRCodeGeneratorScreen from '../screens/QR.js';
import Tower from '../screens/Tower.js';
import Admin from '../screens/Admin.js';
import IstvanScreen from '../screens/IstvanScreen.js';
import Villano from '../screens/VillanoScreen.js'
import LogOut from '../screens/LogOut.js';

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
            <Tab.Screen key="logOut" name="logOut" component={LogOut} />
        );
    }
    
        //Pantallas ACÓLITO
    else if (userRole === "Acolito") {
        tabScreens.push(
            <Tab.Screen key="Home" name="Home" component={MyStack} />,
            <Tab.Screen key="Profile" name="Profile">
                {() => <Profile user={user} />}
            </Tab.Screen>,
            <Tab.Screen key="Potions" name="Potions" component={Potions} />,
            <Tab.Screen key="QR" name="QR" component={QRCodeGeneratorScreen} />,
            <Tab.Screen key="TOWER" name="TOWER" component={Tower} />
        );
    }
    else if(userRole === "Istvan") {
        tabScreens.push(
            <Tab.Screen key="Istvan" name="Istvan" component={IstvanScreen} />,
            <Tab.Screen key="logOut" name="logOut" component={LogOut} />
        )
    }
    else if(userRole === "Mortimer") {
        tabScreens.push(
            <Tab.Screen key="Mortimer" name="Mortimer" component={Admin} />,
            <Tab.Screen key="logOut" name="logOut" component={LogOut} />
        )
    }
    else if(userRole === "Villano") {
        tabScreens.push(
            <Tab.Screen key="Villano" name="Villano" component={Villano} />,
            <Tab.Screen key="logOut" name="logOut" component={LogOut} />
        )
    }

    else{
        tabScreens.push(
            <Tab.Screen key="logOut" name="logOut" component={LogOut} />
        )
    }

}

export {asignRol};