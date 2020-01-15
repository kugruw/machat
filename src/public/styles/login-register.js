import {StyleSheet} from 'react-native';
import color from '../../config/color';

const s = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 36},
  header: {marginBottom: 25},
  img: {width: 125, height: 125},
  register: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {width: 150, height: 24},
  section: {marginVertical: 15},
  input: {
    borderColor: color.col2,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal:15,
    fontSize: 16,
  },
  flexCenter: {justifyContent: 'center', alignItems: 'center', flexDirection: 'row'},
  textCenter: {textAlign: 'center'},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wAuto: {width: 'auto'},
});

export default s;
