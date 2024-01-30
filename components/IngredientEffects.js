import React from 'react'
// import {ScrollView} from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    width: 92%;
    height: 100%;
    flex-direction: row;
    align-items: left;
    top: 0px;
    left: 1%;
`

const ItemCardFooter = styled.View`
    position: absolute;
    width: 100%;
    height: 10%;
    top: -6%;
    left: 0px;
`;

const Text = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
    padding-top: 25px;
    text-align: left;
    color: black;
`;

const EffectsText = styled.Text`
    font-size: 18px;
    margin: 0 10px;
    padding-top: 5px;
    text-align: left;
    color: black;
    left: 5%;
`;


const IngredientEffects = ({item}) => {
    if(item.effects){
        return (
            <Container>
                <ItemCardFooter>
                    <Text>Effects:</Text>
                    {item.effects.map((effect, index) => {
                        key={index} 
                        return(
                            <EffectsText>- {effect}</EffectsText>
                        );

                    })}

                </ItemCardFooter>
            </Container>
            
    );

    }
    else{
        return(
            <>
            </>
        )
    }
};
  

export default IngredientEffects
