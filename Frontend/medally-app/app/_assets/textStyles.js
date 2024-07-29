import { StyleSheet } from 'react-native';
import { colors } from './colors';


const textStyles = StyleSheet.create({
  onboardingTitle: {
    fontSize: 32,
    letterSpacing: -1,
    lineHeight: 32,
    fontWeight: '800',
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'left',
    color: colors.defaultblack,
  },
  screenTitle: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: '800',
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'left',
    color: colors.defaultblack,
  },
  containerActionText: {
    color : colors.defaultwhite,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'left',
  },
  paragraphTitle: {
    fontSize: 16,
    letterSpacing: -0.6,
    lineHeight: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'left',
  },
  contentText: {
    fontSize: 16,
    letterSpacing: -0.6,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',

    secondary:{
      color : colors.secondarytext
    },
    tertiary: {
      color : colors.secondarytext
    }
  },

  smallParagraphTitle: {
    fontSize: 14,
    letterSpacing: -0.6,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
    colors : colors.defaultblack
  },
});

export default textStyles;
