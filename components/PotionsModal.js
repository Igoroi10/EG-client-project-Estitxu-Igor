import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity , Image} from 'react-native';
import styled from 'styled-components/native';
import fakeIngredients from '../fakeData/fakeIngredients.json';
import potionHandler from '../helpers/potionHandler';
import axios from 'axios';


const PotionsModal = ({towerStatus, setTowerStatus, potionStatus, setPotionCreated}) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);


  useEffect(() => {
    async function fetchIngredients() {
        try {
            const response = await axios.get('https://fly-eg-staging.fly.dev/api/ingredients/');
            const responseData = response.data.data;
            setIngredientsData(responseData);
        } catch (error) {
            console.error('Error al obtener los ingredientes:', error);
        }
    }

    fetchIngredients();
}, []);

  const handleIngredientPress = (item) => {
    if (selectedIngredients.length < 2 && !selectedIngredients.includes(item)) {
      setSelectedIngredients([...selectedIngredients, item]);
    } else {
      alert("Cannot use the same ingredient twice or select more than 2 ingredients");
    }
  };

  const createPotion = () => {
    if (selectedIngredients.length === 2) {
      const createdPotion = potionHandler(selectedIngredients[0], selectedIngredients[1]);
    } else {
      alert("Select 2 ingredients to create a potion");
    }
  };

  const deleteIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <>
      <ContentContainer visible={towerStatus === 'potionCreation' && potionStatus !== 'Potion of cleanse_parchment'?true:false}>
        {selectedIngredients.length < 2 && (
          <FlatList
            data={ingredientsData}
            renderItem={({ item }) => (
              <IngredientButton
                onPress={() => handleIngredientPress(item)}
                style={
                  selectedIngredients.includes(item)
                    ? { backgroundColor: 'gray' }
                    : {}
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <ButtonText>{item.name}</ButtonText>
              </IngredientButton>
            )}
            keyExtractor={(item) => item.key}
          />
        )}
        {selectedIngredients.length === 2 && (
          <SelectedIngredientsContainer>
            <SelectedIngredientsText>
              Selected Ingredients: {selectedIngredients[0].name} and {selectedIngredients[1].name}
            </SelectedIngredientsText>
          </SelectedIngredientsContainer>
        )}
        {selectedIngredients.length === 2 && (
          <ButtonContainer>
            <CreateButton onPress={createPotion}>
              <ButtonText>Create Potion</ButtonText>
            </CreateButton>
          </ButtonContainer>
        )}
        <ButtonContainer>
        <DeleteIngredientsButton onPress={deleteIngredients}>
          <ButtonText>Delete Ingredients</ButtonText>
        </DeleteIngredientsButton>
          </ButtonContainer>
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.View`
  position: absolute;
  margin-top: 20%;
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
  font-size: 20px;
  text-align: center;
`;

const SelectedIngredientsContainer = styled.View`
  align-items: center;
  text-align: center;
  width: 100%;
`;

const styles = {
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
    },
};

export default PotionsModal;