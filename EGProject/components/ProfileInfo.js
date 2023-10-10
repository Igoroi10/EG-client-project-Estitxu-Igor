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

const UserCardFooter = styled.View`
  position: absolute;
  width: 100%;
  height: 35%;
  top: 0;
  left: 0px;
  background: ${(props) => (props.profile ? '#FFFFFF' : 'rgba(255, 255, 255, 0)')};
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
