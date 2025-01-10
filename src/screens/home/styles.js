import { StyleSheet } from "react-native";
import { Colors, GStyles, Layouts } from "../../constants";

const Styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 2
  },
  logo: {
    width: 500,
    height: 300
  },
  bottomContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginHorizontal: -15,
    backgroundColor: Colors.petrol
  },
  bottomInnerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center"
  },
  tabsWrapper: {
    paddingTop: Layouts.isSmallDevice ? 10 : 15,
    paddingBottom: Layouts.isSmallDevice ? 10 : 15,
    justifyContent: "center",
    alignItems: "center"
  },
  bg: {
    backgroundColor: Colors.darkGrey,
    width: 40,
    position: "absolute",
    top: Layouts.isSmallDevice ? 10 : 15,
    right: 0,
    left: 80,
    height: "100%",
    zIndex: -1
  }
});

export default Styles;
