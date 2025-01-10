//import liraries
import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { AppButton, ScreenWrapper } from "../../commons/";
import { Images } from "../../constants";
// import { connect } from "react-redux";
import { changeScreenOrientation } from "../../commons/utils";

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 500,
    height: 350
  }
});

class StartGameScreen extends Component {
  componentDidMount() {
    // this.props.navigation.navigate("PlayerNamesScreen");
    changeScreenOrientation("landscape");
  }
  render() {
    return (
      <ScreenWrapper wrapperStyle={Styles.container}>
        <Image
          source={Images.tweedColorLogo}
          style={Styles.logo}
          resizeMode="contain"
        />

        <AppButton
          petrolTheme
          btnStyle={{ width: 250, marginVertical: 50 }}
          title="START"
          onPress={() => this.props.navigation.navigate("PlayerNamesScreen")}
        />
      </ScreenWrapper>
    );
  }
}

export default StartGameScreen;
