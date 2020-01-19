import React, {useState} from 'react';
import {StyleSheet, View, Text as TextMedium, TextInput} from 'react-native';
import {
  Container,
  Content,
  Footer,
  Button,
  Icon,
  Text,
  FooterTab,
} from 'native-base';
import ss from '../../public/styles';

const Room = ({
  navigation: {
    state: {params},
  },
}) => {
  const [message, setMessage] = useState('');
  return (
    <Container>
      <Content
        padder
        contentContainerStyle={s.container}
        style={ss.grayBgColor}>
        <Text>Woy</Text>
      </Content>
      <Footer style={ss.lightBgColor}>
        <FooterTab style={ss.lightBgColor}>
          <TextInput
            placeholder="Type message"
            style={s.input}
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button transparent icon style={[s.sendButton, ss.lightBgColor]}>
            <Icon name="send" style={ss.primaryColor} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const s = StyleSheet.create({
  input: {marginLeft: 16, width: '100%'},
  sendButton: {height: '100%', position: 'absolute', right: 0},
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

Room.navigationOptions = ({navigation}) => {
    return {
        title: navigation.state.params.name,
    };
}

export default Room;
