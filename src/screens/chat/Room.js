import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
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
  const [chatId, setChatId] = useState(params.chatId);
  const {
    chats: {[chatId]: chat},
    user,
  } = useContext(RootContext);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const postMessage = {
      message,
      sender: user.uid,
      receiver: params.key,
    };
    if (chatId) {
      db.ref(`messages/${chatId}/${+new Date()}`).set(postMessage);
    } else {
      const newChat = db
        .ref()
        .child('messages')
        .push().key;

      db.ref(`chats/${params.key}`)
        .update({[newChat]: true})
        .then(() => {
          db.ref(`chats/${user.uid}`)
            .update({[newChat]: true})
            .then(() => {
              db.ref(`messages/${newChat}/${+new Date()}`).set(postMessage).then(() => {
                setChatId(newChat);
              });
            });
        });
    }
    setMessage('');
  };

  useEffect(() => {
    if (chat) {
      const chatList = [];
      Object.keys(chat).forEach(key => {
        chatList.push({
          key,
          message: chat[key].message,
          position: chat[key].sender === user.uid ? s.right : s.left,
        });
      });
      setData(chatList);
    }
  }, [chat, chatId]);

  return (
    <Container style={[s.relative, ss.grayBgColor]}>
      <View style={s.container}>
        <FlatList
          contentContainerStyle={s.chatList}
          data={data}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View style={item.position}>
              <Text style={[ss.lightBgColor, s.message]}>{item.message}</Text>
            </View>
          )}
        />
      </View>
      <Footer style={[ss.lightBgColor, s.footer]}>
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
    paddingHorizontal: 10,
    paddingBottom: 15,
    flex: 1,
  },
  chatList: {
    justifyContent: 'flex-end',
  },
  footer: {position: 'absolute', bottom: 0},
  relative: {position: 'relative'},
});

Room.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.name,
  };
};

export default Room;
