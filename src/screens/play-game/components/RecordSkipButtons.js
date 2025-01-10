//import liraries
import React from "react";
import { View, StyleSheet } from "react-native";
import { AppButton } from "../../../commons";
import { onRecordPress, onSkipPress } from "../logics";
import { Colors } from "../../../constants";

const Styles = StyleSheet.create({
  buttonsWrapper: {
    // flex: 1,
    flexDirection: "row",
    // marginLeft: 20,
    marginTop: 15,
    justifyContent: "space-between"
  }
});

export default function RecordSkipButtons(props) {
  function onPressRecordBtn() {
    onRecordPress(
      props.change,
      props.gameSession,
      props.pins,
      props.activePlayer,
      props.fixedPressedPins,
      props.resetPins,
      props.lastScore,
      props.navigateToViewScoreScreen,
      props.fastMode
    );
  }

  function onSkipPressBtn() {
    onSkipPress(
      props.change,
      props.gameSession,
      props.activePlayer,
      props.resetPins,
      props.lastScore,
      props.navigateToViewScoreScreen,
      props.fastMode
    );
  }
  return (
    <View style={Styles.buttonsWrapper}>
      <AppButton
        btnStyle={{ flex: 1, marginRight: 30 }}
        title="RECORD"
        petrolTheme
        onPress={onPressRecordBtn}
      />
      {/* <View style={{ marginHorizontal: 15 }} /> */}
      <AppButton
        btnStyle={{ flex: 1, borderColor: Colors.petrol }}
        outline
        disabled={
          (props.gameSession && props.gameSession.length <= 1) ||
          (props.activePlayer && props.activePlayer.activeBallIndex !== 0)
        }
        textStyle={{ color: Colors.petrol }}
        title="SKIP PLAYER"
        onPress={onSkipPressBtn}
      />
    </View>
  );
}
