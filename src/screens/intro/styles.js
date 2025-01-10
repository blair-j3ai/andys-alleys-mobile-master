import { StyleSheet } from "react-native";
import { Colors, GStyles, Layouts } from "../../constants";

const Styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  logo: {
    width: 500,
    height: 300
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
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
  },
  // Confirmation View styles
  root: { flex: 1, alignItems: "center" },
  title: {
    ...GStyles.lightGrey20Medium,
    fontSize: 32,
    textAlign: "center"
  },
  supportText: { ...GStyles.lightGrey20Medium, marginTop: 28 },
  codeFiledRoot: { width: 260 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#fff",
    textAlign: "center",
    color: Colors.lightGrey,
    borderRadius: 8,
    textAlignVertical: "center"
  },
  focusCell: {
    borderColor: "#fff"
  },
  buttonView: {
    width: 262,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  }
});

export default Styles;
