import axios from "axios";
import {setSecureValue, getSecureAccess, getSecureRefresh} from './keychain'




const refreshToken = async (mail) => {
    console.log("*************inside refresh token************")    
    const refresh = await getSecureRefresh();

    console.log("*****************REFRESH TOKEN**************")
    console.log(refresh)

    

    const newTokens = await axios.post('https://fly-eg-staging.fly.dev/api/users/refresh', 
        {email: mail},
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

