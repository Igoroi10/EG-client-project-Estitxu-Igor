import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import fakeIngredients from '../fakeData/fakeIngredients.json';
import potionHandler from '../helpers/potionHandler';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const PotionsModal = ({ towerStatus, setTowerStatus, potionStatus, setPotionCreated }) => {
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
      setPotionCreated(createdPotion);
      setTowerStatus('corruptScroll');
      deleteIngredients()

      if (potionStatus !== 'Potion of cleanse_parchment') {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Creación de Poción',
          text2: "La poción creada no sirve para limpiar el pergamino",
        });
      }
    } else {
      alert("Select 2 ingredients to create a potion");
    }
  };

  const deleteIngredients = () => {
    setSelectedIngredients([]);
  };
  
  const close = () => {
    setTowerStatus('start');
    setPotionCreated('start')
    deleteIngredients()
  };
  

  return (
    <ModalContainer transparent={true} visible={towerStatus === 'potionCreation' && potionStatus !== 'Potion of cleanse_parchment' ? true : false}>
      <ContentContainer>
      <CloseButton onPress={close}>
        <CloseButtonText>X</CloseButtonText>
      </CloseButton>
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
    </ModalContainer>
  );
};

const ModalContainer = styled.Modal`
`;
const ContentContainer = styled.View`
  border-radius: 10px;
  margin-top: 16%;
  height:85%;
`;

const ButtonContainer = styled.View`
  align-items: center;
  height: 100px;;
`;

const IngredientButton = styled.TouchableOpacity`
  background-color: indigo;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 25px;
`;

const CreateButton = styled.TouchableOpacity`
  top: 20px; /* Ajusta la posición según tus necesidades */
  background-color: green;
  border-radius: 50px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const DeleteIngredientsButton = styled.TouchableOpacity`
  top: 5px; /* Ajusta la posición según tus necesidades */
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
  top: 20px; /* Ajusta la posición según tus necesidades */
  background-color: white;
  border-radius: 10px;
  margin-top: 100px;
`;

const SelectedIngredientsContainer = styled.View`
  align-items: center;
  text-align: center;
  width: 100%;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px; /* Ajusta la posición según tus necesidades */
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50px;
  z-index: 1;
`;

const CloseButtonText = styled.Text`
  color: white;
  left: 15px;
  top: 10px;
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
