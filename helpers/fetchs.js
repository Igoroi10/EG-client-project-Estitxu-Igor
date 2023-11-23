async function fetchArtifacts() {
    try {
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/artifacts/');
        const responseData = response.data.data;
        setArtifacts(responseData);
    } catch (error) {
        console.error('Error al obtener los artefactos:', error);
    }
  }

  async function fetchStatus() {
    try {
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/search/');
        const responseData = response.data.data[0].validation;
        setStatus(responseData);
    } catch (error) {
        console.error('Error al obtener el search:', error);
    }
  }

  export {
    fetchArtifacts,
    fetchStatus
  }