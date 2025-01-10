//import liraries
import React, { Component } from "react";
import { Image, View } from "react-native";
import { change } from "redux-form";
import { connect } from "react-redux";

import { ScreenWrapper } from "../../commons";
import { Images } from "../../constants";
import Styles from "./styles";
import { changeScreenOrientation } from "../../commons/utils";

import ConfirmationView from "./components/ConfirmationView";

class InfoVerificationScreen extends Component {
  componentDidMount() {
    changeScreenOrientation("landscape");
  }

  render() {
    return (
      <ScreenWrapper
        wrapperStyle={{
          paddingVertical: 0,
          justifyContent: "space-around"
        }}
      >
        <View style={Styles.logoWrapper}>
          <Image
            source={Images.tweedColorLogo}
            style={Styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={Styles.bottomContainer}>
          <ConfirmationView {...this.props} />
        </View>
      </ScreenWrapper>
    );
  }
}

export default connect(() => ({}), { change })(InfoVerificationScreen);
