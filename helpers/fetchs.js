import axios from "axios";
import {getSecureAccess} from './../helpers/keychain'


async function fetchArtifacts() {
    try {
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/artifacts/');
        const responseData = response.data.data;
        return responseData
    } catch (error) {
        console.error('Error al obtener los artefactos:', error);
    }
  }

  async function fetchSearchStatus() {
    try {
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/search/');
        const responseData = response.data.data[0].validation;
        return responseData;
    } catch (error) {
        console.error('Error al obtener el search:', error);
    }
  }

  async function fetchAllUsers() {
    try {
      const access = await getSecureAccess();
      const response = await axios.get('https://fly-eg-staging.fly.dev/api/users/', {headers: {
       'Authorization': `Bearer ${access}`
      }
    });

      const responseData = response.data.data;
      
        return responseData;
    } catch (error) {
        console.error('Error al obtener el search:', error);
    }
  }
  



  export {
    fetchArtifacts,
    fetchSearchStatus,
    fetchAllUsers
  }