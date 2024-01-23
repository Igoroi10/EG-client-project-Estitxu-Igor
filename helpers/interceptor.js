import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { getSecureAccess, getSecureRefresh } from "./keychain";
import { EXPIRED_MESSAGE, SOCKET_URL } from "../constants/constants";
import refreshToken from "./refreshToken";
import { useContext } from "react";
import { Context } from "../AppContext";





const authFetch = axios.create({
    baseURL: 'https://fly-eg-staging.fly.dev/api',
    headers: {
        'Authorization': ``
       }
});

authFetch.interceptors.request.use(
    async (request) => {
        const access = await getSecureAccess();
        (request).headers['Authorization'] = `Bearer ${access}`;
        // {headers: {
        //     'Authorization': `Bearer ${access}`
        //    }
        // console.log(request.data)
        // request.headers.common['Accept'] = `Bearer ${access}`
        console.log('request sent');
        console.log(request)

        return request
    }, 
    (error)=>{
        console.log("*****************ERROR el request**************")
        console.log(error)
        return Promise.reject(error)
    }
);

authFetch.interceptors.response.use(
    (response) => {
        console.log("*************RESPONSE********")
        console.log('got response');
        console.log(response);
        return response;
    },
    async (error) => {
        const{globalState, handleGlobalState} = useContext(Context);

        console.log("****************ERROR CONFIG**************")
        console.log(error.config.email)
        const mail = error.config.email;
        
        console.log("*****************ERROR el response**************")
        console.log(error.response.data.data.error.message)

        if(error.response.data.data.error.message === EXPIRED_MESSAGE){
            console.log("*****************Petición caducada*******************")
            if(globalState.user.email){
                const newAccessToken = await refreshToken(mail);

                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
    
                const returnData = await axios
                .request(error.config)
                // .then((response) => resolve(response))
                // .catch((err) => reject(err));
                
                console.log("¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬returnData¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬")
                console.log(returnData)
    
            }
            else{
                const returnData = "";
            }
            return returnData
        }
    }
);


export default authFetch;