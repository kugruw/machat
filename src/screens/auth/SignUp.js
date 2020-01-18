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
  let [username, setUsername] = useState('');
  let [config, setConfig] = useState({
    loading: false,
    error: false,
  });

  const handleSubmit = () => {
    if (!email || !username || !password) {
      toastr('Please fill out all of this field.', 'danger');
      return;
    }
    setConfig({loading: true, error: false});
    db.ref(`users/${username}`)
      .once('value')
      .then(snapshot => {
        if (!snapshot.val()) {
          registerUser();
        } else {
          toastr('Username already registered');
          setConfig({loading: false, error: false});
        }
      })
      .catch(err => {
        toastr(err.message);
        setConfig({loading: false, error: true});
      });
  };
  const registerUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        db.ref(`users/${username}`).set(
          {
            ...initialState.user,
            id: user.uid,
            email: user.email,
            name: user.email.split('@', 1)[0],
          },
          err => {
            if (!err) {
              user.updateProfile({displayName: username}).then(() => {
                setConfig({loading: false, error: false});
                toastr(
                  'Your account successfully registered. You can login now!',
                  'success',
                );
                goBack();
              });
            }
          },
        );
      })
      .catch(err => {
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
            placeholder="Username"
            style={s.input}
            value={username}
            onChangeText={text => setUsername(text)}
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
