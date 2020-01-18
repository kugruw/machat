import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Container, Text, Button} from 'native-base';

import {toastr, getDataStorage} from '../../helpers/script';
import s from '../../public/styles/login-register';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles';
import {firebase} from '../../config/firebase';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation: {push, navigate, state: {params}}}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState({
    loading: false,
    error: false,
  });
  const setLoggedIn = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', JSON.stringify({loggedIn: true}));
    } catch (err) {
      toastr('Ops, something error');
    }
    navigate(params ? params.continue : 'Chat', params && {delete: true});
  };
  const loginUser = () => {
    if (!user || !password) {
      toastr('Please fill out all of this field.');
      return;
    }
    setConfig({loading: true, error: false});
    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(() => {
        setConfig({loading: false, error: false});
        setLoggedIn();
      })
      .catch(() => {
        setConfig({loading: false, error: true});
        toastr('Invalid email or password.', 'danger');
      });
  };
  useEffect(() => {
    getDataStorage('loggedIn', value => {
      const redirect = params ? true : false;
      if(value !== null && !redirect) {
        navigate('Chat');
      }
    });
  }, []);
  return (
    <Container style={s.center}>
      <View style={s.container}>
        <View style={[s.header, s.center]}>
          <Image
            source={require('../../public/images/logo.png')}
            style={s.img}
          />
        </View>
        <View style={s.section}>
          <TextInput
            editable={!config.loading}
            placeholder="Email"
            style={s.input}
            value={user}
            onChangeText={text => setUser(text)}
          />
        </View>
        <View style={s.section}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            editable={!config.loading}
            style={s.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={s.section}>
          <Button
            rounded
            disabled={config.loading}
            style={[s.center, sGlobal.button, sColor.primaryBgColor]}
            onPress={loginUser}>
            {config.loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text>Login</Text>
            )}
          </Button>
        </View>
        <View style={[s.section]}>
          <View style={s.flexCenter}>
            <Text>Don't have an account? </Text>
            <TouchableHighlight onPress={() => push('SignUp')}>
              <Text style={sColor.secondaryColor}> Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Container>
  );
};

Login.navigationOptions = {
  headerShown: false,
};

export default Login;
