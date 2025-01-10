//import liraries
import React, { Component } from "react";
import { View, Text, Alert} from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { find } from "lodash";

import { ScreenWrapper, Frames, HourlyViewWithButton } from "../../commons";
import { GStyles } from "../../constants";
import { Pins, GameScore, RecordSkipButtons } from "./components";
import { changeScreenOrientation } from "../../commons/utils";
import { initializePlayers } from "./logics";
import Styles from "./Styles";
import { fixedPressedPins, resetPins, undoPins } from "./actions";

const selector = formValueSelector("Game");

class PlayGameScreen extends Component {
  state = {
    // pins: initialPinState,
    remTime: 0
  };

  navigateToViewScoreScreen = () => {
    this.props.navigation.navigate("ViewScoreScreen");
  };

  async componentDidMount() {
    const { players, change, noOfPlayedGames, gameType, fastMode } = this.props;
    changeScreenOrientation("landscape");
    this.props.resetPins();
    initializePlayers(players, change, noOfPlayedGames, fastMode);
    if (gameType === "Hourly") {
      this.setTimeCount();
    }
  }

  setTimeCount = () => {
    const { gameCount } = this.props;

    this.setState(
      {
        remTime: gameCount
      },
      () => {
        this.setTimeIntervalForTimer();
      }
    );
  };

  setTimeIntervalForTimer = () => {
    this.timeInterval = setInterval(() => {
      this.setState(prevState => ({
        remTime: prevState.remTime + 1
      }));
    }, 1000);
  };

  onDonePressed = () => {
    const {
      change,
      navigation: { navigate },
      gameType
    } = this.props;

    Alert.alert("Please verify you would like to stop the game", undefined, [
      {
        text: "Cancel",
      },
      {
        text: "Stop",
        onPress: () => {
          if (gameType === "Hourly") {
            navigate("ViewScoreScreen");
            change("isHourlyGameDone", true);
            return;
          }

          change("isNormalGameDone", true);
          navigate("ViewScoreScreen");
        },
      },
    ]);
  };

  componentWillUnmount() {
    if (this.timeInterval) {
      this.props.change("gameCount", this.state.remTime + 1);
      clearInterval(this.timeInterval);
    }
  }

  render() {
    const {
      activePlayer,
      gameSession,
      gameType,
      noOfPlayedGames,
      lastScore,
      undoPins,
      change
    } = this.props;
    return (
      <React.Fragment>
        <ScreenWrapper wrapperStyle={{ padding: 0 }}>
          <View style={[GStyles.spaceBetn, Styles.header]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={[GStyles.lightGrey20Medium, { paddingLeft: 5 }]}>
                {activePlayer ? activePlayer.name : ""}
              </Text>

              <Text style={GStyles.lightGrey20Medium}>
                | FRAME {activePlayer ? activePlayer.activeFrameIndex + 1 : ""}
              </Text>
            </View>

            <HourlyViewWithButton
              remtime={this.state.remTime}
              onButtonPress={this.onDonePressed}
              gameType={gameType === "Hourly"}
            />
          </View>

          <View style={Styles.contentWrapper}>
            <Frames
              title="Score Board"
              activePlayer={this.props.activePlayer}
            />

            <Field component={View} name="gameSession" />

            <Field component={View} name="gameHistory" />

            <Field component={View} name="lastScore" />

            <Pins />

            <GameScore
              change={change}
              lastScore={lastScore}
              undoPins={undoPins}
              gameSession={gameSession || []}
            />

            <RecordSkipButtons
              {...this.props}
              navigateToViewScoreScreen={this.navigateToViewScoreScreen}
            />
          </View>
        </ScreenWrapper>
      </React.Fragment>
    );
  }
}
const PlayGameScreenForm = reduxForm({
  form: "Game",
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false // <------ unregister fields on unmount
})(PlayGameScreen);

export default connect(
  state => ({
    players: selector(state, "players"),
    pins: state.pins,
    // pulling active players to display their score board
    gameSession: selector(state, "gameSession"),
    activePlayer: find(selector(state, "gameSession"), { isActive: true }),
    noOfPlayedGames: selector(state, "noOfPlayedGames") || 0,
    gameType: selector(state, "gameType"),
    gameCount: selector(state, "gameCount"),
    lastScore: selector(state, "lastScore"),
    fastMode: selector(state, "fastMode")
  }),
  {
    change,
    fixedPressedPins,
    resetPins,
    undoPins
  }
)(PlayGameScreenForm);
