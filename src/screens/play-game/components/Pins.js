import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { Images, Layouts, Colors } from "../../../constants";
import { onPinPress } from "../actions";

const Styles = StyleSheet.create({
  pinBackground: {
    // height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 15,
    flexGrow: 1,
    flex: 1
  },
  pinsWrapper: {
    alignSelf: "center",
    width: Layouts.window.width > 500 ? 500 : "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  pinStyle: {}
});

function Pins({ onPinPress, pins }) {
  return (
    <ImageBackground source={Images.pinBackground} style={Styles.pinBackground}>
      <View style={Styles.pinsWrapper}>
        {Object.values(pins).map((item, index) => (
          <TouchableOpacity
            key={index}
            disabled={item.fixed}
            onPress={() => onPinPress(index)}
            activeOpacity={1}
            style={[
              index === 1 || index === 3 ? { marginTop: 30 } : {},
              index === 2 ? { marginTop: 60 } : {}
            ]}
          >
            <Image
              source={item.pressed ? Images.lightPin : Images.pin}
              style={Styles.pinStyle}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

export default connect(
  state => ({ pins: state.pins }),
  { onPinPress }
)(Pins);
