import React from 'react'
import { FlatList, Text } from 'react-native'
import styled from 'styled-components/native'
import fakeIngredients from '../fakeData/fakeIngredients.json'
import potionHandler from '../helpers/potionHandler'

const Potions = () =>{
    return(
        <>
            <HeadContainer>
                <Text>Potion creation</Text>
            </HeadContainer>
            <ContentContainer>
                <FlatList>

                </FlatList>
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