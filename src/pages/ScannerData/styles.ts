import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,

    backgroundColor: colors.background,
  },

  image: {
    height: Dimensions.get('window').width * 0.5,
    width: '100%',
  },

  pets: {
    width: '100%',
  },

  petsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  title: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  subTitle: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  containerButton: {
    marginTop: 30,
  },
});
