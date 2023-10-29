

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

    alert(ingredientName)
    return ingredientName;
}

 