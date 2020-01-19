import React, {useContext, useState, useEffect} from 'react';
import {Container, Content, List} from 'native-base';
import Header from '../../components/Header';
import ChatItem from '../../components/ChatItem';
import RootContext from '../../context';

const Index = props => {
  const {chats, user} = useContext(RootContext);
  const [data, setData] = useState(chats);

  useEffect(() => {
    setData(chats);
  }, [chats]);

  return (
    <Container>
      <Header title="Chat" />
      <Content>
        <List>
          {Object.keys(data).map(key => {
            const message = Object.keys(data[key]);
            const firstMessage = data[key][message[message.length - 1]];
            const {sender, receiver} = firstMessage;
            const name = sender === user.uid ? receiver : sender;
            return (
              <ChatItem
                key={key}
                name={name}
                lastMessage="Doing what you like will always keep you happy . ."
                lastChatTime="3:43"
                handlePress={() =>
                  props.navigation.navigate('ChatRoom', {key, name})
                }
              />
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

Index.navigationOptions = {
  title: 'Chat',
};

export default Index;
