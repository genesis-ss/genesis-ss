import { StyleSheet } from 'react-native';

const ASPECT_RATIO = 16 / 9;

export default StyleSheet.create({

  aboutUsLogo: {
    height: 147,
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    backgroundColor: 'red',
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
  nativeVideoControls: {
    top: 0,
    height: '100%',
  },
  audioComponent: {

    width: '100%',
    height: 50,
    minWidth: '100%',
    aspectRatio: ASPECT_RATIO,
    backgroundColor: 'black',
  },
  videoContainer: {
    height: 'auto',
  },
  videoPoster: {
    top: 50,
    width: '100%',
    minWidth: '100%',
    height: 'auto',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
  videoComponent: {

    width: '100%',
    height: 'auto',
    minWidth: '100%',
    aspectRatio: ASPECT_RATIO,
    backgroundColor: 'black',
  },
});
