import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
  top: 0px;
`;

const NameColumn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const FirstFace = ({user}) => {
  return (
    <>
      <Container>
      <NameColumn>
        <Text>HP</Text>
        <Text>{user.characterMainData.HP}</Text>
      </NameColumn>
      <NameColumn>
        <Text>LvL</Text>
        <Text>{user.characterMainData.LvL}</Text>
      </NameColumn>
      <NameColumn>
        <Text>Money</Text>
        <Text>{user.characterMainData.Money}</Text>
      </NameColumn>
      </Container>
    </>
  );
};

export default FirstFace;
