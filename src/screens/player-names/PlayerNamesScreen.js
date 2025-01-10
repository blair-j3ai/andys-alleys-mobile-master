import React, { Component } from "react";
import { View, Image, Text, BackHandler } from "react-native";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  destroy
} from "redux-form";
import { connect } from "react-redux";
import { AppButton, AppTextInput, ScreenWrapper } from "../../commons";
import { Images, Layouts, Colors, GStyles } from "../../constants";
import Styles from "./Styles";
import { changeScreenOrientation, getGameTimeCount } from "../../commons/utils";

const selector = formValueSelector("Game");

class PlayerNamesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { getParam } = navigation;
    const fromScoreViewScreen = getParam("fromViewScreen", false);

    return {
      gesturesEnabled: !fromScoreViewScreen
    };
  };

  constructor(props) {
    super(props);

    const {
      navigation: { getParam }
    } = props;

    this.state = {
      fromViewScoreScreen: getParam("fromViewScreen", false),
      remTime: undefined
    };
  }

  componentDidMount() {
    changeScreenOrientation("landscape");
    // this.initialize();

    const { gameType } = this.props;
    const { fromViewScoreScreen } = this.state;

    if (fromViewScoreScreen) {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    }

    if (gameType === "Hourly" && fromViewScoreScreen) {
      setTimeout(this.setTimeCount, 1000);
    }
  }

  setTimeCount = () => {
    const { gameCount } = this.props;

    /**   If the player comes from View Score screen and is playing in Hourly mode,
          then the timer is displayed in the PlayerNamesScreen.
    */
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
    /** Setting the timer to display on the screen. */
    this.timeInterval = setInterval(() => {
      this.state.remTime > 0 &&
        this.setState(prevState => ({
          remTime: prevState.remTime + 1
        }));
    }, 1000);
  };

  componentWillUnmount() {
    if (this.state.fromViewScoreScreen) {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    }

    this.clearIntervalAndTimeout();
  }

  handleBackButton = () => {
    return true;
  };

  clearIntervalAndTimeout = () => {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  };

  initialize = () => {
    this.props.initialize(
      { players: ["Bijay", "Shyam", "Umesh"] },
      {
        keepDirty: true,
        keepValues: true
      }
    );
    this.props.change("fastMode", { fastMode: this.props.fastMode });
    this.props.navigation.push("PlayGameScreen");
  };

  playerNameChange = (index, text) => {
    let playerdup = [...this.props.players];
    playerdup[index] = text;
    this.props.change("players", playerdup);
  };

  generatePlayerNameForm = noOfPlayers => {
    // generating array from the user input numbers
    const size = Array.from(Array(noOfPlayers).keys());
    // const size = Array.from(Array(2).keys());
    const playersNameArray = this.props.players;

    return size.map(item => {
      return (
        <View style={Styles.playerInputBox} key={item}>
          <Text style={Styles.playerLabel}>Player {item + 1}</Text>

          <AppTextInput
            onChange={this.playerNameChange}
            index={item}
            playerName={
              playersNameArray.length > 0 ? playersNameArray[item] || "" : ""
            }
            onFocus={() => {
              this.setState({
                [`player${item + 1}InputStyle`]: {
                  borderBottomColor: Colors.petrol
                }
              });
            }}
            onBlur={() => {
              this.setState({ [`player${item + 1}InputStyle`]: {} });
            }}
            outlined
            textInputStyle={{
              paddingBottom: 0,
              paddingLeft: 0,
              ...this.state[`player${item + 1}InputStyle`]
            }}
          />
        </View>
      );
    });
  };

  onPressDone = () => {
    /**
     * converting gameCount to seconds making it reusable
     */
    const {
      gameType,
      change,
      navigation: { navigate }
    } = this.props;
    const { fromViewScoreScreen, remTime } = this.state;

    if (gameType === "Hourly" && fromViewScoreScreen) {
      if (remTime) {
        change("gameCount", remTime + 1);
      }
      this.clearIntervalAndTimeout();

      setTimeout(() => {
        change("Game", "gameSession", []);
        navigate("PlayGameScreen");
      }, 1000);
    } else if (gameType === "Hourly") {
      change("fastMode", { fastMode: this.props.fastMode });
      navigate("PlayGameScreen");
    } else {
      if (fromViewScoreScreen) {
        navigate("PlayGameScreen");
        return;
      }

      // initializing fastMode
      change("fastMode", { fastMode: this.props.fastMode });
      navigate("PlayGameScreen");
    }
  };

  render() {
    const { noOfPlayers, players } = this.props;
    const { remTime } = this.state;

    return (
      <ScreenWrapper wrapperStyle={Styles.container}>
        <View style={Styles.timerView}>
          <Text
            style={[
              GStyles.darkGrey21Regular,
              { alignSelf: "flex-end", padding: 28 }
            ]}
          >
            {this.props.gameType === "Hourly" && remTime !== undefined
              ? getGameTimeCount(this.state.remTime)
              : ""}
          </Text>
        </View>

        <Image
          source={Images.tweedColorLogo}
          style={Styles.logo}
          resizeMode="contain"
        />

        {noOfPlayers ? this.generatePlayerNameForm(Number(noOfPlayers)) : null}

        <Field name="players" component={View} />
        {/* Making done button available only when all names are entered. */}
        {players.filter(item => item && item.length > 0).length ===
          Number(noOfPlayers) && (
          <AppButton
            btnStyle={Styles.btnStyle}
            title="DONE"
            petrolTheme
            onPress={this.onPressDone}
          />
        )}
      </ScreenWrapper>
    );
  }
}
const PlayerNamesScreenForm = reduxForm({
  form: "Game",
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: false // <------ unregister fields on unmount
})(PlayerNamesScreen);

export default connect(
  state => ({
    noOfPlayers: selector(state, "noOfPlayers"),
    players: selector(state, "players") || [],
    gameCount: selector(state, "gameCount"),
    gameType: selector(state, "gameType"),
    fastMode: selector(state, "fastMode"),
    gameHistory: selector(state, "gameHistory")
  }),
  { change, destroy }
)(PlayerNamesScreenForm);
