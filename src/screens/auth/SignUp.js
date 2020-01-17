import React, {useState} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Container, Text, Button} from 'native-base';
import s from '../../public/styles/login-register';
import sColor from '../../public/styles/color';
import sGlobal from '../../public/styles';
import {toastr} from '../../helpers/script';

import initialState from '../../context/initial-state';
import db, {firebase} from '../../config/firebase';

const SignUp = ({navigation: {goBack}}) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [config, setConfig] = useState({
    loading: false,
    error: false,
  });

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      toastr('Please fill out all of this field.', 'danger');
      return;
    }
    if (password !== confirmPassword) {
      toastr("Confirm password doesn't match", 'danger');
      return;
    }
    setConfig({loading: true, error: false});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        db.ref(`users/${user.uid}`).set({...initialState.user, email : user.email, name: user.email.split('@', 1)[0]}, err => {
          if (!err) {
            setConfig({loading: false, error: false});
            toastr(
              'Your account successfully registered. You can login now!',
              'success',
            );
            goBack();
          }
        });
      })
      .catch(err => {
        console.log(err);
        setConfig({loading: false, error: true});
        toastr(err.message, 'danger');
      });
  };
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
            style={s.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={s.section}>
          <TextInput
            editable={!config.loading}
            secureTextEntry={true}
            placeholder="Password"
            style={s.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={s.section}>
          <TextInput
            editable={!config.loading}
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={s.input}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
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
