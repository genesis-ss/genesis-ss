import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  aboutUsLogo: {
    height: 100,
    resizeMode: 'contain',
    width: '100%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatListContainer: {
    justifyContent: 'center',
  },
  backgroundVideo: {
    flex: 1,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
  },
  backgroundAudio: {
    height: 50,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  poster: {
    resizeMode: 'center',
    flex: 1,
    aspectRatio: 1, // Your aspect ratio
    height: 200,
    width: 300,
  },
});
