import React, {useContext, useState, useEffect} from 'react';
import {Container, Content, List} from 'native-base';
import Header from '../../components/Header';
import ChatItem from '../../components/ChatItem';
import RootContext from '../../context';

const Index = props => {
  const {chats, user} = useContext(RootContext);
  const [data, setData] = useState(chats);

  useEffect(() => {
    setData({...data, ...chats});
  }, [chats]);

  return (
    <Container>
      <Header title="Chat" />
      <Content>
        <List>
          {Object.keys(data).map(key => {
            const message = Object.keys(data[key]).find(
              elm => data[key][elm].sender !== user.uid,
            );
            const name = data[key][message].sender;
            return (
              <ChatItem
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
