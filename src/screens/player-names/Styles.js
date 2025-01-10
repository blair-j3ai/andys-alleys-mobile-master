import { StyleSheet } from "react-native";
import { Layouts, GStyles, Colors } from "../../constants";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 500,
    height: 300
  },
  playerInputBox: {
    paddingVertical: Layouts.window.height > 700 ? 20 : 10,
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
    paddingHorizontal: Layouts.isSmallDevice ? "10%" : "30%"
  },
  playerLabel: {
    ...GStyles.lightGrey20Medium,
    paddingRight: 20,
    color: Colors.darkGrey
  },
  btnStyle: {
    // paddingHorizontal: Layouts.isSmallDevice ? "10%" : "30%",
    // width: 250,
    // width: "100%",
    width: 250,
    marginVertical: Layouts.window.height > 700 ? 30 : 20
  },
  timerView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
