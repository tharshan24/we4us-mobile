import {StyleSheet} from 'react-native';
import colorConstant from '../constants/colorConstant';

export const globalStyles = StyleSheet.create({
  headingWelcome: {
    fontFamily: 'Barlow-Bold',
    fontSize: 55,
    color: colorConstant.primaryColor,
  },
  welcomePara: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 18,
    color: colorConstant.subBlueColor,
    textAlign: 'center',
    position: 'relative',
    top: 400,
  },
});
