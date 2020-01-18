import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Container, Content, Text, Item, Icon, Input} from 'native-base';
import ss from '../../public/styles';
import color from '../../config/color';

const Search = () => {
  const [username, setUsername] = useState('');
  return (
    <Container>
      <Content padder style={ss.grayBgColor}>
        <Text>Username</Text>
        <Item style={[s.inputSearch, ss.lightBgColor]}>
          <Input
            returnKeyType="search"
            textContentType="username"
            placeholder="Masukkan"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Icon name="search" />
        </Item>
      </Content>
    </Container>
  );
};

const s = StyleSheet.create({
  inputSearch: {
    borderBottomWidth: 0,
    borderRadius: 3,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
});

Search.navigationOptions = {
  title: 'Search friends',
};

export default Search;
