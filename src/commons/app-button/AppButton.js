//import liraries
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../constants";

// define your Styles
const Styles = StyleSheet.create({
  btnTitle: {
    fontSize: 16,
    color: Colors.petrol
  },
  btnStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.lightGrey
  },
  btnPetrolTheme: {
    borderColor: Colors.petrol,
    backgroundColor: Colors.petrol
  },
  disabledOutlineBtnStyle: {
    borderColor: Colors.lightGrey
  },
  disabledTextOutline: {
    color: Colors.lightGrey
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderColor: Colors.lightGrey
  },
  textOutline: {
    color: Colors.lightGrey
  }
});

// create a component
const AppButton = ({
  title,
  onPress,
  textStyle,
  btnStyle,
  disabled,
  outline,
  petrolTheme,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Styles.btnStyle,
        outline ? Styles.btnOutline : {},
        petrolTheme ? Styles.btnPetrolTheme : {},
        btnStyle,
        disabled && outline ? Styles.disabledOutlineBtnStyle : {}
      ]}
      disabled={disabled}
      {...rest}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text
          style={[
            Styles.btnTitle,
            outline ? Styles.textOutline : {},
            petrolTheme ? Styles.textOutline : {},
            textStyle,
            disabled && outline ? Styles.disabledTextOutline : {}
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

AppButton.propTypes = {
  tilte: PropTypes.string,
  onPress: PropTypes.func,
  textStyle: PropTypes.shape({}),
  btnStyle: PropTypes.shape({}),
  outline: PropTypes.bool,
  petrolTheme: PropTypes.bool
};

AppButton.defaultProps = {
  title: "Button title",
  onPress: () => {},
  textStyle: {},
  btnStyle: {},
  outline: false,
  petrolTheme: false
};

export default AppButton;
