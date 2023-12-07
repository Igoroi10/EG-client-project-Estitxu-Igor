import {useContext, useState, useEffect} from 'react'
import { Context } from '../AppContext';

const userUpdater = (importedUser) => {
    console.log("*************** IMPORTED USER **********")
    console.log(importedUser)

    const{globalState, handleGlobalState} = useContext(Context)

    if(globalState.user.name === importedUser.name)
        handleGlobalState(importedUser)
}

export default userUpdater