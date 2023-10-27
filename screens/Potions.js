import React, { useState, useEffect } from 'react';
import { FlatList, Text, Button, View, Image } from 'react-native';
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

    const renderIngredientItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Button title={item.name} />
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
        );
    };

    return (
        <>
            <HeadContainer>
                <Text>Potion creation</Text>
            </HeadContainer>
            <ContentContainer>
                {ingredientsData.length > 0 ? (
                    <FlatList
                        data={ingredientsData}
                        renderItem={renderIngredientItem}
                        keyExtractor={item => item.key.toString()}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
            </ContentContainer>
        </>
    );
};

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
