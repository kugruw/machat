import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
} from 'native-base';
import {Friends as FriendsHeader, Friends} from '../../components/Header';
import ss from '../../public/styles';
import color from '../../config/color';
import RootContext from '../../context';

const thumbnailSize = 50;

const Index = props => {
  const {friends} = React.useContext(RootContext);
  const [data, setData] = useState(friends);

  useEffect(() => {
    if (friends) {
      const arr = [];
      Object.keys(friends).forEach(key => {
        arr.push({
          key,
          name: friends[key].name,
          status: friends[key].status,
          avatar: friends[key].avatar,
          data: friends[key],
        });
      });
      setData(arr);
    }
  }, [friends]);

  return (
    <Container>
      <FriendsHeader {...props} />
      <View style={[ss.secondaryBgColor]}>
        <TextInput
          style={[s.inputSearch, ss.secondaryBgColor, ss.lightColor]}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Search friends"
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <Friend
            name={item.name}
            status={item.status}
            thumbnail={item.avatar}
            handlePress={() =>
              props.navigation.push('FriendProfile', {
                ...item.data,
                key: item.key,
              })
            }
          />
        )}
      />
    </Container>
  );
};

const Friend = props => {
  return (
    <ListItem avatar noBorder onPress={props.handlePress}>
      <Left style={s.thumbnailContainer}>
        <Thumbnail
          style={s.thumbnail}
          source={
            props.thumbnail
              ? {uri: props.thumbnail}
              : require('../../public/images/user2.png')
          }
        />
      </Left>
      <Body>
        <View>
          <Text>{props.name}</Text>
          <Text note ellipsizeMode="tail" numberOfLines={1}>
            {props.status}
          </Text>
        </View>
      </Body>
    </ListItem>
  );
};

const s = StyleSheet.create({
  thumbnail: {width: thumbnailSize, height: thumbnailSize},
  thumbnailContainer: {
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: 20,
  },
  inputSearch: {
    borderColor: color.light,
    borderWidth: 0.7,
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    borderRadius: 4,
  },
});

export default Index;
