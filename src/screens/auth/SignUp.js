import React, {useState} from 'react';
import {View, TextInput, ActivityIndicator, Image, TouchableHighlight} from 'react-native';
import {Container, H1, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles';
import {toastr} from '../../helpers/script';

const SignUp = props => {
  const {
    navigation: {goBack},
  } = props;
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [config, setConfig] = useState({
    loading: false,
    error: false,
  });

  const handleSubmit = () => {
    if (!username || !email || !password) {
      toastr('Please fill out all of this field.');
      return;
    }
    setConfig({loading: true, error: false});
    // axios
    //   .post(`${API_ENDPOINT + role}/signup`, {
    //     name,
    //     username,
    //     email,
    //     password,
    //   })
    //   .then(() => {
    //     setConfig({loading: false, error: false});
    //     toastr(
    //       'Your account successfully registered. You can login now!',
    //       'success',
    //     );
    //     goBack();
    //   })
    //   //err
    //   .catch(() => {
    //     setConfig({loading: false, error: true});
    //     toastr('Username or email already registered');
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
            placeholder="Username"
            style={s.input}
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={s.section}>
          <TextInput
            style={s.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={s.section}>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
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
            onPress={handleSubmit}>
            {config.loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text>Sign Up</Text>
            )}
          </Button>
        </View>
        <View style={[s.section]}>
          <View style={s.flexCenter}>
          <Text>Already have an account? </Text>
          <TouchableHighlight onPress={() => goBack()}>
            <Text style={sColor.secondaryColor}> Login</Text>
          </TouchableHighlight>
          </View>
        </View>
      </View>
    </Container>
  );
};

SignUp.navigationOptions = {
  headerShown: false,
};

export default SignUp;
