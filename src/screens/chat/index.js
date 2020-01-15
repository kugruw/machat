import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import {firebase} from '../../config/firebase';
import {removeDataStorage} from '../../helpers/script';
import {toastr} from '../../helpers/script';

const Index = (props) => {
  toastr('aw');
  return (
    <View>
      <Button onPress={() => {
        firebase.auth().signOut().then(() => {
          removeDataStorage('loggedIn', err => {
            if(!err) {
              props.navigation.navigate('Login');
            }
          });
        });
      }}>
      <Text>Logout</Text>
      </Button>
    </View>
  );
};

Index.navigationOptions = {
  headerShown: false,
};

export default Index;
