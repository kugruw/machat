import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '../../config/firebase';

const index = ({navigation: {navigate}}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          navigate('Chat');
        } else {
          navigate('Login');
        }
      });
  }, []);
  return (
    <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text>loading</Text>
    </View>
  );
};

export default index;
