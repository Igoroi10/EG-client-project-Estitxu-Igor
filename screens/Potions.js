import React from 'react'
import styled from 'styled-components/native'

const Potions = () =>{

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