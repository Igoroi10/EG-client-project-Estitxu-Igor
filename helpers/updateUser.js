import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

const UpdateUser = ({ isVisible, choosedUser, closeModal }) => {
    const{globalState, handleGlobalState} = useContext(Context);
  
    globalState.userList.forEach((userFromList) => {
        if(userFromList.email === globalState.user.email){
            handleGlobalState({user: userFromList});
        }
    })
};  

export default UpdateUser;
