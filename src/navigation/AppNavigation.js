import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import {
  IntroVerificationScreen,
  HomeScreen,
  StartGameScreen,
  PlayerNamesScreen,
  PlayGameScreen,
  ViewScoreScreen,
  ThankYouScreen
} from "../screens";

// const AppNavigator = createStackNavigator(
//   {
//     HomeScreen,
//     StartGameScreen,
//     PlayerNamesScreen,
//     PlayGameScreen,
//     ViewScoreScreen
//   },
//   {
//     initialRouteName: "HomeScreen",
//     defaultNavigationOptions: {
//       header: null
//     }
//   }
// );

const HomeStack = createStackNavigator(
  {
    HomeScreen,
    StartGameScreen,
    PlayerNamesScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const PlayStack = createStackNavigator(
  {
    PlayGameScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const ViewStack = createStackNavigator(
  {
    ViewScoreScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const ThankYouStack = createStackNavigator(
  {
    ThankYouScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppNavigator = createSwitchNavigator({
  IntroVerificationScreen,
  HomeStack,
  PlayStack,
  ViewStack,
  ThankYouStack
});

export default createAppContainer(AppNavigator);
