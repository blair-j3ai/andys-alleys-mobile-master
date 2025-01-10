//import liraries
import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { formValueSelector, change, destroy } from "redux-form";
import { cloneDeep } from "lodash";

import {
  Frames,
  ScreenWrapper,
  AppButton,
  HourlyViewWithButton
} from "../../commons";
import { Colors, GStyles } from "../../constants";
import { changeScreenOrientation, getGameTimeCount } from "../../commons/utils";
import Styles from "./Styles";

const selector = formValueSelector("Game");

class ViewScoreScreen extends Component {
  state = {
    remTime: undefined
  };

  componentDidMount() {
    changeScreenOrientation("landscape");
    const { gameType } = this.props;

    if (gameType === "Hourly") {
      setTimeout(this.setTimeCount, 1000);
    }
  }

  setTimeCount = () => {
    const { gameCount, isHourlyGameDone } = this.props;

    this.setState(
      {
        remTime: gameCount
      },
      () => {
        if (!isHourlyGameDone) {
          this.setTimeIntervalForTimer();
        }
      }
    );
  };

  setTimeIntervalForTimer = () => {
    this.timeInterval = setInterval(() => {
      this.state.remTime > 0 &&
        this.setState(prevState => ({
          remTime: prevState.remTime + 1
        }));
    }, 1000);
  };

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  onPressNewGame = () => {
    const {
      noOfPlayedGames,
      gameType,
      gameCount,
      change,
      gameSession,
      isHourlyGameDone,
      isNormalGameDone
    } = this.props;
    const { remTime } = this.state;

    // maintaing gameHistory as it's needed to make Email Template
    let gameHistory = this.props.gameHistory || [];
    gameHistory = [...gameHistory, gameSession];
    change("Game", "gameHistory", gameHistory);

    if (gameType === "Hourly") {
      if (gameCount !== 0 && isHourlyGameDone) {
        this.naivgateToCompleteScreen(gameHistory, remTime);
      } else {
        if (remTime) {
          change("Game", "gameCount", remTime + 1);
        }

        setTimeout(() => {
          change("Game", "gameSession", []);
          this.props.navigation.navigate("PlayerNamesScreen", {
            fromViewScreen: true
          });
        }, 300);
      }
    } else {
      if (isNormalGameDone) {
        this.naivgateToCompleteScreen(gameHistory);
      } else {
        if (noOfPlayedGames >= Number(gameCount)) {
          this.naivgateToCompleteScreen(gameHistory);
        } else {
          change("Game", "gameSession", []);

          this.props.navigation.navigate("PlayerNamesScreen", {
            fromViewScreen: true
          });
        }
      }
    }
  };

  onHourlyDonePressed = () => {
    const { change, gameSession } = this.props;
    // maintaing gameHistory as it's needed to make Email Template
    let gameHistory = this.props.gameHistory || [];
    gameHistory = [...gameHistory, gameSession];

    Alert.alert("Please verify you would like to stop the game", undefined, [
      {
        text: "Cancel",
      },
      {
        text: "Stop",
        onPress: () => {
          change("Game", "gameHistory", gameHistory);
          change("Game", "isHourlyGameDone", true);

          this.naivgateToCompleteScreen(gameHistory, this.state.remTime);
        },
      },
    ]);
  };

  naivgateToCompleteScreen = (gameHistory, totalTimePlayed = undefined) => {
    this.props.destroy("Game");
    let gameHistoryCopy = cloneDeep(gameHistory);

    this.props.navigation.navigate("ThankYouScreen", {
      gameHistoryCopy,
      totalTimePlayed
    });
  };

  render() {
    const {
      isHourlyGameDone,
      gameType,
      isNormalGameDone,
      noOfPlayedGames,
      gameCount
    } = this.props;
    const { remTime } = this.state;

    return (
      <ScreenWrapper wrapperStyle={{ padding: 0 }}>
        <View
          style={[
            GStyles.spaceBetn,
            Styles.header,
            { padding: 15, alignItems: "center" }
          ]}
        >
          <Text style={GStyles.lightGrey20Medium}>
            FINAL SCORE: GAME {this.props.noOfPlayedGames}
          </Text>

          <HourlyViewWithButton
            remtime={remTime}
            onButtonPress={this.onHourlyDonePressed}
            hideButton={
              isHourlyGameDone ||
              isNormalGameDone ||
              noOfPlayedGames >= Number(gameCount)
            }
            gameType={gameType === "Hourly"}
          />
        </View>

        <View style={{ padding: 15 }}>
          {this.props.gameSession.map((item, index) => (
            <View style={{ marginBottom: 15 }} key={index}>
              <Frames activePlayer={item} title={item.name} />
            </View>
          ))}

          <View style={Styles.buttonsWrapper}>
            <AppButton
              btnStyle={Styles.newGameBtn}
              title="New Game"
              petrolTheme
              onPress={this.onPressNewGame}
            />

            {/* <AppButton
              title="Finish Game"
              textStyle={{ color: Colors.petrol }}
              outline
              onPress={this.onPressFinishGame}
              btnStyle={Styles.emailScoreBtn}
            /> */}
          </View>
        </View>
      </ScreenWrapper>
    );
  }
}

export default connect(
  state => ({
    gameSession: selector(state, "gameSession"),
    noOfPlayedGames: selector(state, "noOfPlayedGames"),
    gameType: selector(state, "gameType"),
    gameCount: selector(state, "gameCount"),
    gameHistory: selector(state, "gameHistory"),
    isHourlyGameDone: selector(state, "isHourlyGameDone"),
    isNormalGameDone: selector(state, "isNormalGameDone")
  }),
  { change, destroy }
)(ViewScoreScreen);
