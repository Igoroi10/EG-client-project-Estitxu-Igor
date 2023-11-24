import React, { useState, useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import styled from 'styled-components/native';
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
      deleteIngredients();

      if (potionStatus !== 'Potion of cleanse_parchment') {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Creación de Poción',
          text2: "Se ha limpiado el pergamino con éxito!!!!!",
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
    setPotionCreated('start');
    deleteIngredients();
  };
  return (
    <ModalContainer transparent={true} visible={towerStatus === 'potionCreation' && potionStatus !== 'Potion of cleanse_parchment'}>
      <ContentContainer>
        <CloseButton onPress={close}>
          <CloseButtonText>X</CloseButtonText>
        </CloseButton>
        <IngredientList
          data={ingredientsData}
          renderItem={({ item }) => (
            <IngredientItem
              onPress={() => handleIngredientPress(item)}
              selected={selectedIngredients.includes(item)}
            >
              {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />

              )}
              <IngredientName>{item.name}</IngredientName>
            </IngredientItem>
          )}
          keyExtractor={(item) => item.key}
          horizontal
        />
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
  border-radius: 20px;
  margin-top: 50%;
  background-color: #fff;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const IngredientList = styled(FlatList)`
  margin-top: 20px;
`;

const IngredientItem = styled.TouchableOpacity`
background-color: ${(props) => (props.selected ? '#95a5a6' : '#3498db')};
  padding: 15px;
  border-radius: 15px;
  margin-right: 15px;
`;

const CreateButton = styled.TouchableOpacity`
  background-color: #2ecc71;
  border-radius: 25px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const DeleteIngredientsButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  border-radius: 25px;
  height: 50px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const SelectedIngredientsText = styled.Text`
  color: #000;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

const SelectedIngredientsContainer = styled.View`
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  left: 300px;
  width: 40px;
  height: 40px;
  background-color: #c0392b;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const IngredientName = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const styles = {
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
};

export default PotionsModal;

