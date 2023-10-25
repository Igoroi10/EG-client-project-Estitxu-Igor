import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import fakeIngredients from '../fakeData/fakeIngredients.json';
import potionHandler from '../helpers/potionHandler';

const Potions = () => {
  const [ingredientArray, setIngredientArray] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientPress = (item) => {
    if (ingredientArray.length < 2) {
      if (!ingredientArray.includes(item)) {
        setIngredientArray([...ingredientArray, item]);
        setSelectedIngredients([...selectedIngredients, item.name]);
      } else {
        alert("Cannot use the same ingredient twice, please select another one");
      }
    }
  };

  const createPotion = () => {
    if (ingredientArray.length === 2) {
      potionHandler(ingredientArray[0], ingredientArray[1]);
    } else {
      alert("Select 2 ingredients to create a potion");
    }
  };

  const deleteIngredients = () => {
    setIngredientArray([]);
    setSelectedIngredients([]);
  };

  return (
    <>
      <HeadContainer>
        <Text>Potion creation</Text>
      </HeadContainer>
      
      <ContentContainer>
        {ingredientArray.length < 2 && (
          <FlatList
            data={fakeIngredients}
            renderItem={({ item }) => (
              <IngredientButton onPress={() => handleIngredientPress(item)}>

                <ButtonText>{item.name}</ButtonText>

              </IngredientButton>
            )}
            keyExtractor={(item) => item.key}
          />
        )}
        {selectedIngredients.length === 2 && (
          <SelectedIngredientsContainer>
            
            <SelectedIngredientsText>
              Selected Ingredients: {selectedIngredients[0]} and {selectedIngredients[1]}
            </SelectedIngredientsText>

          </SelectedIngredientsContainer>
        )}
        {selectedIngredients.length === 2 && (
          <ButtonContainer>

            <CreateButton onPress={createPotion}>
              <ButtonText>Create Potion</ButtonText>
            </CreateButton>

            <DeleteIngredientsButton onPress={deleteIngredients}>
              <ButtonText>Delete Ingredients</ButtonText>
            </DeleteIngredientsButton>

          </ButtonContainer>
        )}
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
  height: 60%;
`;

const ButtonContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const IngredientButton = styled.TouchableOpacity`
  background-color: #007BFF;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

const CreateButton = styled.TouchableOpacity`
  background-color: green;
  border-radius: 50px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const DeleteIngredientsButton = styled.TouchableOpacity`
  background-color: #ff0000;
  border-radius: 50px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const SelectedIngredientsText = styled.Text`
  color: #000;
  font-size: 15px;
  text-align: center;
`;

const SelectedIngredientsContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export default Potions;
