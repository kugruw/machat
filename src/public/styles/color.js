import {StyleSheet} from 'react-native';
import color from '../../config/color';

const s = StyleSheet.create({
  darkestColor: {color: color.col5},
  dangerColor: {color: color.danger},
  primaryColor: {color: color.col3},
  secondaryColor: {color: color.col4},
  col1: {color: color.col1},
  col2: {color: color.col2},
  grayColor: {color: color.gray},
  regularGrayColor: {color: color.regularGray},
  lightColor: {color: color.light},
  lightGrayColor: {color: color.lightGray},
  paleGrayColor: {color: color.paleGray},

  primaryBgColor: {backgroundColor: color.col3},
  secondaryBgColor: {backgroundColor: color.col4},
  darkestBgColor: {backgroundColor: color.col5},
  bgCol1: {backgroundColor: color.col1},
  bgCol2: {backgroundColor: color.col2},
  regularGrayBgColor: {backgroundColor: color.regularGray},
  grayBgColor: {backgroundColor: color.gray},
  lightBgColor: {backgroundColor: color.light},
});

export default s;
