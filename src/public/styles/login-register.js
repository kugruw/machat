import {StyleSheet} from 'react-native';

const s = StyleSheet.create({
  container: {width: '100%', paddingHorizontal: 36},
  header: {marginBottom: 48},
  register: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {width: 150, height: 24},
  section: {marginVertical: 15},
  input: {
    borderColor: 'rgba(0, 98, 204, .8)',
    borderBottomWidth: 0.5,
    paddingVertical: 4,
    fontSize: 18,
  },
  textCenter: {textAlign: 'center'},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wAuto: {width: 'auto'},
});

export default s;
