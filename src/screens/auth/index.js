import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ss from '../../public/styles';

const index = ({navigation: {navigate}}) => {
  useEffect(() => {
    AsyncStorage.getItem('loggedIn', (err, res) => {
      if(!err) {
        setTimeout(() => {
          if (res) {
            navigate('Chat');
          } else {
            navigate('Login');
          }
        }, 1000);
      }
    });
  }, []);

  return (
    <View style={[ss.center, ss.flex]}>
      <Image source={require('../../public/images/logo-noname.png')} style={s.logo} />
    </View>
  );
};

const s = StyleSheet.create({
  logo: {width: 150, height: 150},
});

export default index;
