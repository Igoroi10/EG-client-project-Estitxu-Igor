import * as Keychain from 'react-native-keychain';
const key = process.env.KEYCHAIN_KEY

const setSecureValue = async (access, refresh) => {
    try {
        Keychain.setGenericPassword(access, refresh, { service: key })

    } catch (e) {
      console.log("error setSecureValue")
    }
  };


const getSecureAccess = async () => {
    try {
        const result = await Keychain.getGenericPassword({ service: key })
        if (result) {
          return result.username
        }
        return false
    } catch (e) {
        console.log("error getSecureAccess")
    }
};

const getSecureRefresh = async () => {
    try {
        const result = await Keychain.getGenericPassword({ service: key })
        if (result) {
            // console.log("************************PASSWORD DEL GENERIC PASSWORD**************");
            // console.log(result.password)
  
          return result.password
        }
        return false
    } catch (e) {
        console.log("error getSecureRefresh")
    }
};

const removeSecureValue = async () => {
    Keychain.resetGenericPassword({ service: key })
}

export {
    setSecureValue,
    getSecureAccess,
    getSecureRefresh,
    removeSecureValue
}