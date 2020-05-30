import { StyleSheet } from "react-native";

export default StyleSheet.create({
  logo: {
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  row: {
    paddingTop: 30
  },
  title: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  badge: {
    alignSelf: "center",
    backgroundColor: "#800080"
  }
});
