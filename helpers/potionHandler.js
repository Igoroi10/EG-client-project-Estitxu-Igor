
const ingredients = [{
    "name": "Mushrooms",
    "effects": ["vitality restoration", "poison healing", "heat enduring", "vision improval"]
 },
 {
     "name": "Clear Water",
     "effects": ["blindness healing", "poison healing"]
  },
  {
     "name": "Mountain's herbs",
     "effects": ["poison healing", "vitality restoration", "energy restoration"]
  },
  {
     "name": "Calcium",
     "effects": ["vitality restoration", "energy restoration", "resistance improval"]
  },
  {
     "name": "Flowes",
     "effects": ["energy restoration", "heat enduring", "vitality restoration", "vision improval"]
  },
  {
     "name": "Fire Sparks",
     "effects": ["energy restoration", "cold enduring", "resistance improval"]
  },
  {
     "name": "Divine Essence",
     "effects": ["max restoration", "poison healing", "heat enduring"]
  },
  {
     "name": "Demonic Infusion",
     "effects": ["max restoration", "cold enduring", "vision improval"]
  }
 ]

export default function potionHandler(ingredient1, ingredient2){

    const commonEffects = [];
    ingredient1.effects.forEach(el=> {
        commonEffects.push(el);
    });

    ingredient2.effects.forEach(el2=> {
        let check = 0;
        ingredient1.effects.forEach(el1 => {
            if(el2 === el1)
                check++;
        })

        if(check === 0)
            commonEffects.push(el2)
    })

    let ingredientName = "Potion of ";

    commonEffects.forEach(el => {
        ingredientName += el+", ";
    })

    ingredientName = ingredientName.substring(0, ingredientName.length-2)

    return ingredientName;
}

console.log(potionHandler(ingredients[7], ingredients[6]))