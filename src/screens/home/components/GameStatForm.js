//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import { GStyles } from "../../../constants";
import { AppTextInput, AppButton, AppSwitch } from "../../../commons";
import { reduxForm, Field, change } from "redux-form";
import { connect } from "react-redux";

import {
  required,
  maxSixPlayers,
  number
} from "../../../constants/Validations";
import Styles from "./gameStatFormStyles";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  connect
};

class GameStatForm extends Component {
  constructor(props) {
    super(props);
    // this.initialize();
  }

  handleStart = () => {
    const {
      selectedTabIndex,
      change,
      navigation: { navigate }
    } = this.props;

    if (selectedTabIndex === 1) {
      change("isHourlyGameDone", false);
      change("gameCount", 0);
      navigate("StartGameScreen");
      return;
    }

    change("isNormalGameDone", false);
    navigate("StartGameScreen");
  };

  initialize = () => {
    this.props.initialize(
      { gameCount: "2", noOfPlayers: "3" },
      {
        enableReInitialize: true
      }
    );
    this.handleStart();
  };

  render() {
    const { handleSubmit, selectedTabIndex } = this.props;

    return (
      <React.Fragment>
        <View style={Styles.switchContainer}>
          <Text style={Styles.label}>Fast Mode:</Text>

          <Field component={AppSwitch} name="fastMode" />
        </View>
        <View style={Styles.bottomBoxWrapper}>
          {selectedTabIndex === 0 ? (
            <View
              style={[GStyles.row, { paddingBottom: 30, alignItems: "center" }]}
            >
              <Text style={Styles.label}>GAMES </Text>

              <Field
                component={AppTextInput}
                name="gameCount"
                keyboardType="numeric"
                validate={[required, number]}
                {...this.props}
              />
            </View>
          ) : null}

          <View style={[GStyles.row, { alignItems: "center" }]}>
            <Text style={Styles.label}>PLAYERS</Text>

            <Field
              keyboardType="numeric"
              component={AppTextInput}
              name="noOfPlayers"
              validate={[required, number, maxSixPlayers]}
              {...this.props}
            />

            <Field component={View} name="gameType" />

            <Field component={View} name="noOfPlayedGames" />

            <Field component={View} name="isHourlyGameDone" />

            <Field component={View} name="isNormalGameDone" />
          </View>
        </View>

        <View style={Styles.buttonsWrapper}>
          <AppButton
            btnStyle={{ width: 150 }}
            outline
            title="START"
            onPress={handleSubmit(value => this.handleStart(value))}
          />

          <AppButton
            btnStyle={{ width: 150 }}
            title="SETTINGS"
            // onPress={() => this.props.navigation.push("StartGameScreen")}
          />
        </View>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "Game",
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: false // <------ unregister fields on unmount
  })(GameStatForm)
);
