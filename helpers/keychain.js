import * as Keychain from 'react-native-keychain';
const key = process.env.KEYCHAIN_KEY

const setSecureValue = async (acces, refresh) => {
    try {
        Keychain.setGenericPassword(acces, refresh, { service: key })

    } catch (e) {
      console.log("error setSecureValue")
    }
  };


const getSecureAcces = async () => {
    try {
        const result = await Keychain.getGenericPassword({ service: key })
        if (result) {
          return result.username
        }
        return false
    } catch (e) {
        console.log("error getSecureAcces")
    }
};

const getSecureRefresh = async () => {
    try {
        const result = await Keychain.getGenericPassword({ service: key })
        if (result) {
          return result.password
        }
        return false
    } catch (e) {
        console.log("error getSecureAcces")
    }
};

const removeSecureValue = async () => {
    Keychain.resetGenericPassword({ service: key })
}

export {
    setSecureValue,
    getSecureAcces,
    getSecureRefresh,
    removeSecureValue
}