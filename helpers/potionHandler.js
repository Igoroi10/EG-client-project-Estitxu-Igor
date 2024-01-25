
import axios from 'axios';
import socket from '../helpers/socket';


export default async function potionHandler(ingredient1, ingredient2, user){
    console.log("****************************AFFECTIONS*************************")
    const affections = await fetchAffections();
    console.log(affections);
    // const commonEffects = [];
    // ingredient1.effects.forEach(el=> {
    //     commonEffects.push(el);
    // });

    // ingredient2.effects.forEach(el2=> {
    //     let check = 0;
    //     ingredient1.effects.forEach(el1 => {
    //         if(el2 === el1)
    //             check++;
    //     })

    //     if(check === 0)
    //         commonEffects.push(el2)
    // })

    // let ingredientName = "Potion of ";

    // commonEffects.forEach(el => {
    //     ingredientName += el+", ";
    // })

    // ingredientName = ingredientName.substring(0, ingredientName.length-2)

   // alert(ingredientName)


    let potion = [];

    ingredient1.effects.forEach(ingEffect => {
        affections.forEach(affection => {
            affection.healing_effects.forEach(affectionEffect => {
                if(affectionEffect === ingEffect){
                    potion = affection;
                }
            })
        })
    })

    ingredient2.effects.forEach(ingEffect => {
        potion.healing_effects.forEach(affectionEffect => {
            if(ingEffect === affectionEffect){
                //crear pocion
                if(user){
                    cureCurse(user, potion.id);
                }

                return potion.name
            }
        })
    })

    
    


    return "failedPotion";
}


async function fetchAffections() {
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