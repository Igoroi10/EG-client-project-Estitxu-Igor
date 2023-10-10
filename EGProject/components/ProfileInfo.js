import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 65px;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
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

const FirstFace = () => {
  return (
    <>
      <Container>
        <NameColumn>
          <Text>HP</Text>
        </NameColumn>
        <NameColumn>
          <Text>LvL</Text>
        </NameColumn>
        <NameColumn>
          <Text>Money</Text>
        </NameColumn>
      </Container>
    </>
  );
};

export default FirstFace;
