import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Container, View, Button, Text} from 'native-base';
import Header from '../../components/Header';
import ChatItem from '../../components/ChatItem';
import ss from '../../public/styles';
import RootContext from '../../context';
import {FlatList} from 'react-native-gesture-handler';
import db from '../../config/firebase';

const Index = props => {
  const {chats, user, dispatch} = useContext(RootContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (chats) {
      const chatList = [];
      const chatRoom = [];
      Object.keys(chats).forEach(key => {
        const message = Object.keys(chats[key]);
        const lastMessage = chats[key][message[message.length - 1]];
        const {sender, receiver} = lastMessage;
        const name = sender === user.uid ? receiver : sender;
        const date = new Date(parseInt(message[message.length - 1]));
        chatRoom.push({name, chatId: key});
        db.ref(`users/${name}`).once('value', snapshot => {
          chatList.push({
            chatId: key,
            key: receiver,
            name,
            lastMessage: lastMessage.message,
            date: `${date.getHours()}.${date.getMinutes()}`,
            snapshot: snapshot.val(),
          });
        });
      });
      dispatch.addChatRoom(chatRoom);
      setData(chatList);
    }
  }, [chats]);

  return (
    <Container>
      <Header title="Chat" />
      <FlatList
        data={data}
        keyExtractor={item => item.chatId}
        renderItem={({item}) => (
          <ChatItem
            avatar={item.snapshot.avatar}
            name={item.snapshot.name}
            lastMessage={item.lastMessage}
            lastChatTime={item.date}
            handlePress={() =>
              props.navigation.push('ChatRoom', {
                chatId: item.chatId,
                key: item.key,
                name: item.name,
                snapshot: item.snapshot,
              })
            }
          />
        )}
      />
      {!data.length && (
        <View style={s.imageContainer}>
          <View>
            <Image
              style={s.image}
              source={require('../../public/images/no-chat.png')}
            />
            <Button style={[ss.bgCol2, ss.center]} onPress={() => props.navigation.navigate('Friends')}>
              <Text>Chatan sekarang!</Text>
            </Button>
          </View>
        </View>
      )}
    </Container>
  );
};

const s = StyleSheet.create({
  textCenter: {textAlign: 'center'},
  imageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 250, height: 250},
});

Index.navigationOptions = {
  title: 'Chat',
};

export default Index;
