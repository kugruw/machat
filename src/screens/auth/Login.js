import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Container, Text, Button} from 'native-base';

import {getDataStorage, toastr} from '../../helpers/script';
import s from '../../public/styles/login-register';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles';

const Login = props => {
  const {
    navigation: {navigate},
  } = props;
  getDataStorage('token', token => {
    if (token !== null) {
      navigate('Engineers');
    }
  });
  let [user, setUser] = useState('');
  let [password, setPassword] = useState('');
  let [config, setConfig] = useState({
    loading: false,
    error: false,
  });
  const storeData = async data => {
    try {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('id', data.id);
      await AsyncStorage.setItem('username', data.username);
      await AsyncStorage.setItem('role', data.role);
      navigate('Engineers');
    } catch (err) {}
  };
  const loginUser = () => {
    if (!user || !password) {
      toastr('Please fill out all of this field.');
      return;
    }
    // setConfig({loading: true, error: false});
    // axios
    //   .post(`${API_ENDPOINT}login`, {
    //     user,
    //     password,
    //   })
    //   .then(res => {
    //     setConfig({loading: false, error: false});
    //     storeData(res.data.values);
    //   })
    //   //err
    //   .catch(() => {
    //     setConfig({loading: false, error: true});
    //     toastr('Incorrect username or password.');
    //   });
  };
  return (
    <Container style={s.center}>
      <View style={s.container}>
        <View style={[s.header, s.center]}>
          <Image source={require('../../public/images/logo.png')} />
        </View>
        <View style={s.section}>
          <TextInput
            editable={!config.loading}
            placeholder="Username or email"
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
          <TouchableHighlight onPress={() => navigate('SignUp')}>
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
