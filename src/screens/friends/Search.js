import React from 'react';
import {View, TextInput} from 'react-native';
import {Container, Content, Text} from 'native-base';

const Search = () => {
  return (
    <Container>
      <Content>
        <Text>Username</Text>
        <TextInput placeholder="Masukkan" />
      </Content>
    </Container>
  );
};

Search.navigationOptions = {
  title: 'Search friends',
};

export default Search;
