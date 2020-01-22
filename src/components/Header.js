import React from 'react';
import sGlobal from '../public/styles';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import color from '../config/color';

const MyHeader = props => {
  return (
    <Header androidStatusBarColor={color.col5} noLeft style={sGlobal.secondaryBgColor}>
      <Body>
        <Title>{props.title}</Title>
      </Body>
    </Header>
  );
};

export const Friends = ({navigation: {navigate}}) => {
  return (
    <Header androidStatusBarColor={color.col5} noLeft style={sGlobal.secondaryBgColor}>
      <Body>
        <Title>Friends</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigate('FriendsLocation')}>
          <Icon name="wifi" />
        </Button>
        <Button transparent onPress={() => navigate('SearchFriends')}>
          <Icon name="person-add" />
        </Button>
      </Right>
    </Header>
  );
};

export const ChatRoomHeader = ({title}) => {
  return (
    <Header androidStatusBarColor={color.col5} noLeft style={sGlobal.secondaryBgColor}>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => alert('More')}>
          <Icon name="more" />
        </Button>
      </Right>
    </Header>
  );
};

export default MyHeader;
