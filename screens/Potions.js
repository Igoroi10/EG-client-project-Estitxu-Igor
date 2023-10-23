import React from 'react'
import styled from 'styled-components/native'
import fakeIngredients from '../fakeData/fakeIngredients.json'
import potionHandler from '../helpers/potionHandler'

const Potions = () =>{

    console.log(potionHandler(fakeIngredients.Mushrooms, fakeIngredients.Calcium));
    return(
        <>
            <HeadContainer>
                <Text>Potion creation</Text>
            </HeadContainer>
            <ContentContainer>
                
            </ContentContainer>
            <ContentContainer>

            </ContentContainer>
        </>
    )

} 

const HeadContainer = styled.View`
    margin-top: 5%;
    height: 15%
`

const ContentContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
`
export default Potions