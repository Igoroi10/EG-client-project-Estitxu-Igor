import React, { useState, useEffect } from 'react';
import { FlatList, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Potions = () => {
    const [ingredientsData, setIngredientsData] = useState([]);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await axios.get('http://192.168.0.26:3000/api/ingredients/');
                const responseData = response.data.data;
                setIngredientsData(responseData);
            } catch (error) {
                console.error('Error al obtener los ingredientes:', error);
            }
        }

        fetchIngredients();
    }, []);

    return (
        <>
            <HeadContainer>
                <Text>Potion creation</Text>
            </HeadContainer>
            <ContentContainer>
                {ingredientsData.length > 0 ? (
                    <FlatList
                        data={ingredientsData}
                        renderItem={({ item }) => (
                            <Button title={item.name} />
                        )}
                        keyExtractor={item => item.key.toString()}
                    />
                ) : (
                    <Text>Loading...</Text>
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
    height: 40%;
`;

export default Potions;
