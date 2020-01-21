import React from 'react';
import {ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';

const ChatItem = props => {
  return (
    <ListItem noBorder avatar onPress={props.handlePress}>
      <Left>
        <Thumbnail source={props.avatar ? {uri: props.avatar} : require('../public/images/user2.png')} />
      </Left>
      <Body>
        <Text>{props.name}</Text>
        <Text note>{props.lastMessage}</Text>
      </Body>
      <Right>
        <Text note>{props.lastChatTime}</Text>
      </Right>
    </ListItem>
  );
};

export default ChatItem;
