import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';
import sGlobal from '../../public/styles';
import sColor from '../../public/styles/color';
import color from '../../config/color';
import Header from '../../components/Header';
import {DangerModal} from '../../components/Modal';
import {removeDataStorage, toastr, clearSession} from '../../helpers/script';
import {firebase} from '../../config/firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default function Account({navigation: {navigate, push}}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [config, setConfig] = useState({error: false, loading: false});
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem('loggedIn').then(() => {
          navigate('Login');
        });
      });
  };
  const deleteAccount = () => {
    // axios
    //   .delete(`${API_ENDPOINT}profile`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + data.token,
    //     },
    //     data: {user_id: data.user_id},
    //   })
    //   .then(() => {
    //     setConfig({loading: false, error: false});
    //     setDeleteModal(false);
    //     clearSession(() => navigate('Auth'));
    //   })
    //   .catch(() => {
    //     setConfig({loading: false, error: true});
    //     setDeleteModal(false);
    //     toastr('Ops, network error');
    //   });
  };
  return (
    <Container>
      <DangerModal
        title="Delete Account"
        message="Are you sure to delete this account?"
        submitButtonText="Delete"
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onSubmit={deleteAccount}
      />
      <Header title="Account" />
      <Content>
        {/* <View style={[sColor.secondaryBgColor, s.banner]}>
          <View style={[sGlobal.center, s.imgContainer]}>
            <View style={s.imgView}>
              <ImageBackground
                source={require('../../public/images/user2.png')}
                imageStyle={s.imgCircle}
                style={[s.img, s.border, s.imgCircle]}>
                <ImageBackground
                  source={{
                    uri: `${''}images/profile/${'file.png'}`,
                  }}
                  imageStyle={s.imgCircle}
                  style={s.img}
                />
              </ImageBackground>
            </View>
          </View>
          <H2 style={[sGlobal.textCenter, sColor.lightColor]}>
            {'Puput'}
          </H2>
          <TextMedium style={[sGlobal.textCenter, sColor.lightColor]}>
            {'william'}
          </TextMedium>
        </View> */}
        <List style={s.listContainer}>
          <ListItem itemDivider style={sColor.lightBgColor}>
            <Text>Settings</Text>
          </ListItem>
          <ListArrow icon="contact" handlePress={() => push('Profile')}>
            Profile
          </ListArrow>
          <ListArrow icon="mail" handlePress={() => push('ChangeEmail')}>
            Email
          </ListArrow>
          <ListArrow icon="key" handlePress={() => push('ChangePassword')}>
            Password
          </ListArrow>
          <ListArrow
            icon="ios-close-circle"
            last
            style={sColor.dangerColor}
            handlePress={() => setDeleteModal(true)}>
            Delete Account
          </ListArrow>

          <ListItem itemDivider style={sColor.lightBgColor}>
            <Text>Others</Text>
          </ListItem>
          <ListArrow icon="ios-help-circle">Help</ListArrow>
          <ListArrow icon="ios-information-circle" last>
            About
          </ListArrow>
          <ListArrow
            icon="log-out"
            last
            style={sColor.primaryColor}
            handlePress={logout}>
            Logout
          </ListArrow>
        </List>
      </Content>
    </Container>
  );
}

Account.navigationOptions = {
  title: 'Account',
};

const s = StyleSheet.create({
  banner: {
    paddingVertical: 48,
  },
  imgContainer: {
    marginBottom: 20,
  },
  imgView: {position: 'relative', width: 75, height: 75},
  imgCircle: {borderRadius: 75 / 2},
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  border: {
    borderColor: color.light,
    borderWidth: 2.5,
  },
  listContainer: {
    paddingVertical: 15,
  },
  list: {
    borderBottomWidth: 0.5,
    borderColor: color.paleGray,
  },
  py: {
    paddingVertical: 5,
  },
});

const ListArrow = ({children, icon, style, last, handlePress}) => {
  return (
    <View style={[s.py, !last && s.list]}>
      <ListItem icon noBorder onPress={handlePress}>
        <Left>
          <Icon name={icon} style={style} />
        </Left>
        <Body>
          <Text style={style}>{children}</Text>
        </Body>
        {icon !== 'log-out' && (
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        )}
      </ListItem>
    </View>
  );
};
