import React from 'react'
import { FlatList, Text, Button } from 'react-native'
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

                 <FlatList 
                        data={fakeIngredients}
                        renderItem={({item}) => (
                            <Button title = {item.name}
                                name={item.name}
                            />
                        )}
                        keyExtractor={item => item.id}
                />
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