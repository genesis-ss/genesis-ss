import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1, // Your aspect ratio
    height: 200,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    paddingTop: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badge: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#800080',
  },
  imageButton: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});
