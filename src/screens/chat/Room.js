import React, {useContext, useState, useEffect} from 'react';
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
import {toastr} from '../../helpers/script';
import RootContext from '../../context';
import db from '../../config/firebase';

const Room = ({
  navigation: {
    state: {params},
  },
}) => {
  const {
    chats: {[params.key]: chat},
    user,
  } = useContext(RootContext);
  const [data, setData] = useState(chat);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    db.ref(`messages/${params.key}/${+new Date()}`).set(
      {message, sender: user.uid, receiver: params.name},
      err => {
        if (err) {
          toastr('No internet connection');
        }
        setMessage('');
      },
    );
  };

  useEffect(() => {
    setData(chat);
  }, [chat]);

  return (
    <Container>
      <Content
        padder
        contentContainerStyle={s.container}
        style={ss.grayBgColor}>
        {Object.keys(data).map(elm => (
          <View
            key={elm}
            style={data[elm].sender === user.uid ? s.right : s.left}>
            <Text style={[ss.lightBgColor, s.message]}>
              {data[elm].message}
            </Text>
          </View>
        ))}
      </Content>
      <Footer style={ss.lightBgColor}>
        <FooterTab style={ss.lightBgColor}>
          <TextInput
            placeholder="Type message"
            style={s.input}
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button
            transparent
            icon
            style={[s.sendButton, ss.lightBgColor]}
            onPress={sendMessage}>
            <Icon name="send" style={ss.primaryColor} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const s = StyleSheet.create({
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  message: {
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    borderRadius: 7,
    maxWidth: '75%',
  },
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
};

export default Room;
