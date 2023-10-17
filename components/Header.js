import React from 'react'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native';

const Header = () => {
    return(
        <Container>
            <Text> EG-Proyect</Text>
            {/* <Row>
                <Button>
                    <MaterialCommunityIcons name='account' size={26} color='black' />
                </Button>
            </Row> */}
        </Container>
    )
}
export default Header

const Container = styled.View`
 width: 100%;
 height: 58px;
 padding: 0 11px;
 align-items: center;
 flex-direction: column;
 justify-content: space-between;
 margin-top: 10%; 
`
const Text = styled.Text`
 color: #DDDDDD;
 font-size: 50px;
 font-weight: bold;
 letter-spacing: -0.3px;
 
`
const Row = styled.View`
 flex-direction: row;
`
const Button = styled.TouchableOpacity`
 width: 42px;
 height: 42px;
 border-radius: 10px;
 margin-left: 16px;
 background: #EEEEEE;
 align-items: center;
 justify-content: center;
`