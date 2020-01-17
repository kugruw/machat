import React from 'react';
import {View, Text} from 'react-native';
import sGlobal from '../public/styles';

const Loader = () => {
  return (
    <View style={[sGlobal.wFull, sGlobal.bgOpacity, sGlobal.center]}>
      <Text>loading</Text>
    </View>
  );
};

export default Loader;
