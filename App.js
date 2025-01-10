import React from "react";
import { Alert, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

import configureStore from "./src/redux/store";
import { ScreenOrientation } from "expo";
import AppNavigation from "./src/navigation/AppNavigation";
import { fontAssets, imageAssets } from "./helper";

Sentry.init({
  dsn: "https://e0d41a0330244b1791e10a9905a0f51c@sentry.io/1827443"
});
Sentry.setRelease(Constants.manifest.revisionId);

export default class App extends React.Component {
  state = {
    appIsReady: false
  };

  loadAssetsAsync = async () => {
    await Promise.all([fontAssets, ...imageAssets]);
    this.setState({ appIsReady: true });
  };

  handleAppLoadError = () => {
    Alert.alert(
      "Network Error",
      "Unable to Load the Assets. Please try again later...",
      [{ text: "OK", onPress: () => this.loadAssetsAsync }],
      { cancelable: false }
    );
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => {}}
          onError={this.handleAppLoadError}
        />
      );
    }
    return (
      <Provider store={configureStore()}>
        <StatusBar barStyle="light-content" />

        <AppNavigation />
      </Provider>
    );
  }
}

// changeScreenOrientation();
// locking the orientation to landscape
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );
}
