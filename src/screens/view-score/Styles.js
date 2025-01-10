import { StyleSheet } from "react-native";
import { Colors, Layouts } from "../../constants";

export default StyleSheet.create({
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    backgroundColor: Colors.petrol,
    padding: Layouts.isSmallDevice ? 15 : 25
  },
  newGameBtn: {
    flex: 1,
    backgroundColor: Colors.petrol
    // marginRight: 30
  },
  emailScoreBtn: {
    flex: 1,
    borderColor: Colors.petrol
  }
});
