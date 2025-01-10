import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export default StyleSheet.create({
  container: {
    padding: 0,
    // flexGrow: 0,
    flex: 1
  },
  topContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: Colors.petrol,
    justifyContent: "center",
    alignItems: "center"
  },
  logoWrapper: {
    width: 500,
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    flex: 1,
    width: "100%"
  },
  completedText: {
    paddingVertical: 20
  },
  thankYouText: {
    paddingBottom: 20
  },
  arrow: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.white
  }
});
