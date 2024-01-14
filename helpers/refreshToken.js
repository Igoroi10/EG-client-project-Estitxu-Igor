import axios from "axios";
import {setSecureValue, getSecureAccess, getSecureRefresh} from './keychain'
import React, { useEffect, useState, useContext} from 'react'
import { Context } from "../AppContext";




const refreshToken = async () => {
    console.log("*************inside refresh token************")

    // const{globalState, handleGlobalState} = useContext(Context)
    
    const refresh = await getSecureRefresh();

    console.log("*****************REFRESH TOKEN**************")
    console.log(refresh)


    const newTokens = await axios.post('https://fly-eg-staging.fly.dev/api/users/refresh', 
        // {email: globalState.user.email},
        {email: 'esther.fernandez@ikasle.aeg.eus'},
        {headers: {
                    'Authorization': `Bearer ${refresh}`
                   }
                   
                })

    await setSecureValue(newTokens.data.data.access, newTokens.data.data.refresh);
    const newAccess = await getSecureAccess()

    console.log("*****************NEW ACCESS**************")
    console.log(newAccess)

    return newAccess;
    
}

export default refreshToken;

