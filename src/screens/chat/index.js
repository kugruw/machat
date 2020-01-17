import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import Header from '../../components/Header';

const Index = () => {
  return (
    <Container>
      <Header title="Chat" />
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require('../../public/images/user2.png')} />
            </Left>
            <Body>
              <Text>Kumar Pratik</Text>
              <Text note>
                Doing what you like will always keep you happy . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

Index.navigationOptions = {
  title: 'Chat',
};

export default Index;
