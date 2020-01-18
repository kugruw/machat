import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Text} from 'native-base';
import sGlobal from '../public/styles';

const Loader = ({text = 'Loading'}) => {
  return (
    <View style={[sGlobal.full, sGlobal.bgOpacity, sGlobal.center]}>
      <View style={[sGlobal.lightBgColor, s.container]}>
        <ActivityIndicator size="large" />
        <Text style={sGlobal.mt}>{text}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 100,
    borderRadius: 3,
  },
});

export default Loader;
