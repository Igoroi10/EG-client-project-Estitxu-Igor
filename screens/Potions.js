import React from 'react';
import { FlatList, Text, Button, View } from 'react-native';
import styled from 'styled-components/native';
import fakeIngredients from '../fakeData/fakeIngredients.json';
import potionHandler from '../helpers/potionHandler';

const Potions = () => {

  let ingredientArray = [];

  const handleIngredientPress = (item) => {

    ingredientArray.push(item);
    
    if(ingredientArray[0] == ingredientArray[1]){
        alert("Cannot be used the same ingredient twice, please select another one")
        ingredientArray.splice[1]
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
          <View>
            <Button
              title="Create Potion"
              onPress={() => {
                if(ingredientArray.length!=2){
                    alert("Select 2 ingredients to create potion")
                }
                else{
                    potionHandler(ingredientArray[0], ingredientArray[1]);
                }
                
              }}
            />
          </View>
        
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
