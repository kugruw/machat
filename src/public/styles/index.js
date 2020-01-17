import {StyleSheet} from 'react-native';

const flex = {
  flex: 1,
  justifyContent: 'center',
};

const flexRow = {
  ...flex,
  flexDirection: 'row',
};

const s = StyleSheet.create({
  flexRow,
  flexRowSpace: {
    ...flexRow,
    alignContent: 'space-between',
  },
  flexRowAround: {
    ...flexRow,
    justifyContent: 'space-around',
  },
  flexRowCenter: {
    ...flexRow,
    alignItems: 'center',
  },
  flexRowReverse: {
    ...flex,
    flexDirection: 'row-reverse',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {paddingVertical: 20, marginHorizontal: 50},
  rounded: {borderRadius: 3},
  textCenter: {textAlign: 'center'},
  wFull: {width: '100%'},
  w1_2: {width: '50%'},
  bgOpacity: {backgroundColor: 'rgba(0, 0, 0, .7)'},
});

export default s;
