
import axios from 'axios';
import socket from '../helpers/socket';


export default async function potionHandler(ingredient1, ingredient2, user){
    const affections = await fetchAffections(user);

    let potion = [];

    if(ingredient1.effects){
        ingredient1.effects.forEach((ingEffect) => {
            affections.forEach((affection) => {
                affection.healing_effects.forEach(affectionEffect => {
                    if(affectionEffect === ingEffect){
                        potion = affection;
                        console.log(potion)
                    }
                })
            })
        
        })
        if(potion){
            ingredient2.effects.forEach(ingEffect => {
                potion.healing_effects.forEach(affectionEffect => {
                    if(ingEffect === affectionEffect){
                        if(user){
                            cureCurse(user.email, potion.id);
                            console.log("correct potion")
                            return potion.name
        
                        }
                    }
                })
            })
    
        }
    }
    

    return "failedPotion";
}


async function fetchAffections(user) {
    try {
      const response = await axios.get('https://fly-eg-staging.fly.dev/api/affection/');
      const responseData = response.data.data;
        return responseData;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
    }
  }
 

  function cureCurse(userEmail, diseaseId){
    const data = {
      "email": userEmail,
      "apply": false,
      "diseaseId": diseaseId
    }
    socket.emit('sickUser', data);
  }