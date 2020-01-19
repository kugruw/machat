import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Button as NativeButton, Image} from 'react-native';
import {Container, Content, Button, Text, Item, Icon, Input} from 'native-base';
import ss from '../../public/styles';
import color from '../../config/color';
import Loader from '../../components/Loader';
import {toastr} from '../../helpers/script';
import db, {firebase} from '../../config/firebase';
import RootContext from '../../context';

const Search = props => {
  const {
    user: {uid},
  } = useContext(RootContext);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(undefined);
  const [config, setConfig] = useState({loading: false, error: false});

  const handleSearch = () => {
    setConfig({loading: true, error: false});
    db.ref(`users/${username}`)
      .once('value')
      .then(snapshot => {
        setConfig({loading: false, error: false});
        if (snapshot) {
          setUser(snapshot.val());
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setConfig({loading: false, error: true});
        toastr('Network error.');
      });
  };

  const addFriend = () => {
    if(username === uid) {
      toastr('Anda gak punya teman?');
      return;
    }
    setConfig({loading: true, error: false});
    db.ref(`friends/${firebase.auth().currentUser.displayName}/${username}`)
      .set(true)
      .then(() => {
        setConfig({loading: false, error: false});
        toastr('Good, you have new friend.', 'success');
        props.navigation.navigate('Friends');
      })
      .catch(() => {
        setConfig({loading: false, error: true});
        toastr('Network error.');
      });
  };

  return (
    <Container>
      <Content padder style={ss.grayBgColor}>
        <Text>Username</Text>
        <Item style={[s.inputSearch, ss.lightBgColor]}>
          <Input
            returnKeyType="search"
            textContentType="username"
            placeholder="Friend username"
            value={username}
            onChangeText={text => setUsername(text)}
            onSubmitEditing={handleSearch}
          />
          <Button transparent style={s.searchButton} onPress={handleSearch}>
            <Icon name="search" style={ss.primaryColor} />
          </Button>
        </Item>
        <View style={[ss.flexRowCenter, s.contaierCard]}>
          {user && (
            <Card
              name={user.name}
              imgUri={user.avatar}
              handlePress={addFriend}
            />
          )}
          {user === null && <Text>User not found</Text>}
        </View>
      </Content>
      {config.loading && <Loader />}
    </Container>
  );
};

const Card = props => {
  return (
    <View style={[ss.lightBgColor, ss.shadow, s.card]}>
      <View style={ss.center}>
        <View>
          <Image
            source={
              props.imgUri
                ? {uri: props.imgUri}
                : require('../../public/images/user2.png')
            }
            style={s.img}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[ss.textCenter, s.name]}>
            {props.name}
          </Text>
        </View>
      </View>
      <NativeButton
        title="Add"
        color={color.col3}
        onPress={props.handlePress}></NativeButton>
    </View>
  );
};

const s = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    right: 0,
    height: '100%',
    borderColor: color.paleGray,
    borderLeftWidth: 1,
  },
  contaierCard: {marginTop: 30},
  card: {padding: 25, borderRadius: 7, width: 225},
  name: {marginTop: 5, marginBottom: 15},
  img: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  inputSearch: {
    borderBottomWidth: 0,
    borderRadius: 3,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
});

Search.navigationOptions = {
  title: 'Search friends',
};

export default Search;
