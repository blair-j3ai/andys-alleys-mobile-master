import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { GStyles, Colors } from "../../constants";

import { getGameTimeCount } from "../utils";
import { AppButton } from "../app-button";

const STYLES = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const HourlyViewWithButton = ({
  remtime,
  onButtonPress,
  hideButton = false,
  gameType
}) => (
  <View style={STYLES.mainContainer}>
    {gameType && remtime !== undefined ? (
      <Text style={[GStyles.lightGrey20Medium, { paddingRight: 8 }]}>
        {getGameTimeCount(remtime)}
      </Text>
    ) : null}

    {hideButton ? null : (
      <AppButton
        btnStyle={{
          borderColor: Colors.petrol,
          backgroundColor: Colors.white
        }}
        outline
        textStyle={{ color: Colors.petrol }}
        title="STOP"
        onPress={onButtonPress}
      />
    )}
  </View>
);

export default HourlyViewWithButton;
