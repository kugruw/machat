import React from 'react';
import {View} from 'react-native';
import {Container, Content, Text} from 'native-base';

const Maps = () => {
  return (
    <Container>
      <Content>
        <Text>Maps</Text>
      </Content>
    </Container>
  );
};

Maps.navigationOptions = {
  title: 'Friends location',
};

export default Maps;
