import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: {    
    height: 100,
    width:100
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
    backgroundColor: '#800080',
  },
  imageButton: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  imageColumn: {
    alignItems: "center"
    
  }
});
