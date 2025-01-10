//import liraries
import React, { Component } from "react";
import { StatusBar, StyleSheet, Platform, View } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Constants from "expo-constants";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../constants";

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15
  },
  statusBar: {
    backgroundColor: Colors.petrol,
    paddingTop: Constants.statusBarHeight
  }
});

class ScreenWrapper extends Component {
  static defaultProps = {
    wrapperStyle: {},
    scrollEnabled: true
  };

  static propTypes = {
    wrapperStyle: PropTypes.shape({}),
    scrollEnabled: PropTypes.bool
  };

  render() {
    const { wrapperStyle, scrollEnabled } = this.props;
    return (
      <React.Fragment>
        <View style={Styles.statusBar} />

        <KeyboardAwareScrollView
          contentContainerStyle={[Styles.container, wrapperStyle]}
          keyboardShouldPersistTaps={"handled"}
          enableOnAndroid
        >
          {this.props.children}

          {/* <View style={{ marginBottom: 20 }} /> */}
          {/* {Platform.OS === "android" ? <KeyboardSpacer /> : null} */}
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}

export default ScreenWrapper;
