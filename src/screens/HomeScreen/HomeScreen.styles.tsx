import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  aboutUsLogo: {
    height: 100,
    resizeMode: "contain",
    width: "100%",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatListContainer: {
    justifyContent: "center",
  },
  backgroundVideo: {
    flex: 1,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
  },
  backgroundAudio: {
    height: 50,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    bottom: 44,
    left: 4,
    right: 4,
  },
  poster: {
    resizeMode: "center",
    flex: 1,
    aspectRatio: 1, // Your aspect ratio
    height: 200,
    width: 300,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  contentTitle: {
    fontSize: 11,
    alignSelf: "center",
  },
  buttonImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  readingTitle: {
    fontSize: 11,
    alignSelf: "center"
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "purple",
    borderRadius: 50,
  },
  buttonColumn: {
    alignItems: "center"
  }
});
