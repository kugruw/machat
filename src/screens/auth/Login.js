import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {Container, H1, Text, Button} from 'native-base';

import {getDataStorage, toastr} from '../../helpers/script';
import s from '../../public/styles/login-register';

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
        <H1 style={[s.textCenter, s.header]}>MaChat</H1>
        <View style={s.section}>
          <Text>Username or email</Text>
          <TextInput
            style={s.input}
            placeholder="william"
            value={user}
            onChangeText={text => setUser(text)}
          />
        </View>
        <View style={s.section}>
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="***"
            style={s.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={s.section}>
          <Button
            bordered
            style={s.center}
            disabled={config.loading}
            onPress={loginUser}>
            {config.loading ? (
              <ActivityIndicator size="small" color="#3f51b5" />
            ) : (
              <Text>Login</Text>
            )}
          </Button>
        </View>
        <View style={[s.section, s.register]}>
          <Text>Don't have an account?</Text>
          <Button info transparent onPress={() => navigate('SignUp')}>
            <Text> Sign Up</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

Login.navigationOptions = {
  headerShown: false,
};

export default Login;
