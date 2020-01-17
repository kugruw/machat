import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Text} from 'native-base';
import sGlobal from '../public/styles';

const Loader = ({text = 'Loading'}) => {
  return (
    <View style={[sGlobal.full, sGlobal.bgOpacity, sGlobal.center]}>
      <View>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={[sGlobal.mt, sGlobal.lightColor]}>{text}</Text>
      </View>
    </View>
  );
};

export default Loader;
