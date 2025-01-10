import { StyleSheet } from "react-native";
import { Layouts, Colors, GStyles } from "../../../constants";

export default StyleSheet.create({
  bottomBoxWrapper: {
    borderRadius: 3,
    marginBottom: Layouts.isSmallDevice ? 15 : 30,
    paddingVertical: Layouts.isSmallDevice ? 15 : 30,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  buttonsWrapper: {
    ...GStyles.spaceBetn,
    paddingBottom: Layouts.isSmallDevice ? 15 : 30,
    width: "100%"
  },
  label: {
    ...GStyles.lightGrey20Medium,
    paddingRight: 15
  },
  switchContainer: {
    ...GStyles.row,
    alignItems: "center",
    paddingBottom: Layouts.isSmallDevice ? 10 : 15
  }
});
