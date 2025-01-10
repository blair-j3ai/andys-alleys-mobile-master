import { StyleSheet } from "react-native";
import { Colors, GStyles } from "../../constants";

export default StyleSheet.create({
  scoreBoardWrapper: {
    backgroundColor: Colors.lightGrey
  },
  scoreBoardHeader: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: Colors.petrol,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondWhite,
    alignItems: "center",
    backgroundColor: Colors.white,
    justifyContent: "center",
    paddingVertical: 7,
    textAlign: "center"
  },
  activeBallStyle: {
    backgroundColor: Colors.seafoamBlue
  },
  ballNumber: {
    ...GStyles.darkBlueGrey11Regular,
    flexGrow: 1,
    flexShrink: 1
  },
  framesWrapper: {
    paddingLeft: 12,
    paddingRight: 7
  },
  frameWrapper: {
    flexGrow: 1,
    marginRight: 5,
    flexShrink: 1
  },
  frameScore: {
    ...GStyles.darkBlueGrey21Medium,
    marginBottom: 5
  },
  frameNumber: {
    ...GStyles.darkBlueGrey11Regular,
    marginBottom: 5
  }
});
