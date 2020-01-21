import React, {useContext, useState, useEffect} from 'react';
import {Container, Item} from 'native-base';
import Header from '../../components/Header';
import ChatItem from '../../components/ChatItem';
import RootContext from '../../context';
import {FlatList} from 'react-native-gesture-handler';

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
        chatList.push({
          chatId: key,
          key: receiver,
          name,
          lastMessage: lastMessage.message,
          date: `${date.getHours()}.${date.getMinutes()}`,
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
            name={item.name}
            lastMessage={item.lastMessage}
            lastChatTime={item.date}
            handlePress={() =>
              props.navigation.push('ChatRoom', {
                chatId: item.chatId,
                key: item.key,
                name: item.name,
              })
            }
          />
        )}
      />
    </Container>
  );
};

Index.navigationOptions = {
  title: 'Chat',
};

export default Index;
