import React from 'react';
import {StyleSheet, View, Text as TextMedium, TextInput} from 'react-native';
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
import {Friends as FriendsHeader} from '../../components/Header';
import ss from '../../public/styles';
import color from '../../config/color';

const thumbnailSize = 50;

const Index = props => {
  return (
    <Container>
      <FriendsHeader {...props} />
      <Content>
        <View style={[ss.secondaryBgColor]}>
          <TextInput
            style={[s.inputSearch, ss.secondaryBgColor, ss.lightColor]}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Search friends"
          />
        </View>
        <View>
          <List>
            <ListItem avatar noBorder>
              <Left style={s.thumbnailContainer}>
                <Thumbnail
                  style={s.thumbnail}
                  source={require('../../public/images/user2.png')}
                />
              </Left>
              <Body>
                <View>
                  <Text>Kumar Pratik</Text>
                  <Text note ellipsizeMode="tail" numberOfLines={1}>
                    Doing what you like will always keep you happy
                  </Text>
                </View>
              </Body>
            </ListItem>
          </List>
        </View>
      </Content>
    </Container>
  );
};

const s = StyleSheet.create({
  thumbnail: {width: thumbnailSize, height: thumbnailSize},
  thumbnailContainer: {justifyContent: 'center', paddingTop: 12, paddingBottom: 12},
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
