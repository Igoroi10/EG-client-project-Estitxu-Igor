import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue); 
    } catch (e) {
      console.log("error set")
    }
  };
    
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("error get")
    }
  };

  
  export {
    storeData,
    getData
  }