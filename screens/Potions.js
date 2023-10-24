import React from 'react';
import { FlatList, Text, Button, PushNotificationIOS } from 'react-native';
import styled from 'styled-components/native';
import fakeIngredients from '../fakeData/fakeIngredients.json';
import potionHandler from '../helpers/potionHandler';

const Potions = () => {

let ingredientArray= [];

  const handleIngredientPress = (item) => {
    const selectedIngredient = item;
    ingredientArray.push(selectedIngredient)
    //alert(`Ingredient: ${ingredientArray}.`);
    
    //alert(ingredientArray.length)

    if(ingredientArray.length == 2){
        potionHandler(ingredientArray[0], ingredientArray[1])
    }
  };

  return (
    <>
      <HeadContainer>
        <Text>Potion creation</Text>
      </HeadContainer>
      <ContentContainer>
        <FlatList
          data={fakeIngredients}
          renderItem={({ item }) => (
            <Button
              title={item.name}
              onPress={() => handleIngredientPress(item)}
            />
          )}
          keyExtractor={(item) => item.key}
        />
      </ContentContainer>
    </>
  );
};

const HeadContainer = styled.View`
  margin-top: 5%;
  height: 15%;
`;

const ContentContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 40%;
`;

export default Potions;
