import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

const UpdateUser = () => {
    console.log("------------------------------------enters---------------------------")
    const{globalState, handleGlobalState} = useContext(Context);
  
    globalState.userList.forEach((userFromList) => {
        if(userFromList.email === globalState.user.email){
            handleGlobalState({user: userFromList});
        }
    })
}; 

const UpdateUserList = () => {
    const{globalState, handleGlobalState} = useContext(Context);
  
    globalState.userList.forEach((userFromList) => {
        if(userFromList.email === globalState.user.email){
            handleGlobalState({userList: globalState.user});
        }
    })
}; 




export {UpdateUser, UpdateUserList};




