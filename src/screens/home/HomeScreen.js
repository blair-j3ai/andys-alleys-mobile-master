//import liraries
import React, { Component } from "react";
import { Image, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { change } from "redux-form";
import { connect } from "react-redux";

import { ScreenWrapper } from "../../commons";
import { Colors, Images } from "../../constants";
import Styles from "./styles";
import GameStatForm from "./components/GameStatForm";
import { changeScreenOrientation } from "../../commons/utils";

class HomeScreen extends Component {
  state = {
    selectedTabIndex: 0
  };

  componentDidMount() {
    changeScreenOrientation("landscape");
    // this is necessary for faster development
    // this.props.navigation.navigate("ViewScoreScreen");
  }

  handleTabChange(selectedTabIndex) {
    this.setState({
      selectedTabIndex
    });
    let gameType = selectedTabIndex === 0 ? "Games" : "Hourly";
    this.props.change("Game", "gameType", gameType);
  }

  render() {
    const { selectedTabIndex } = this.state;

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
          <View style={Styles.bottomInnerContainer}>
            <View style={Styles.tabsWrapper}>
              <SegmentedControlTab
                values={["Games", "Hourly"]}
                selectedIndex={selectedTabIndex}
                onTabPress={this.handleTabChange.bind(this)}
                tabStyle={{
                  borderWidth: 0,
                  backgroundColor: Colors.darkGrey
                }}
                tabsContainerStyle={{ width: 200 }}
                firstTabStyle={{ borderWidth: 0, borderColor: "transparent" }}
                borderRadius={20}
                activeTabStyle={{
                  backgroundColor: Colors.seafoamBlue,
                  borderRadius: 20
                }}
                tabTextStyle={{ color: Colors.lightGrey }}
                activeTabTextStyle={{ color: Colors.petrol }}
              />
              <View style={Styles.bg} />
            </View>

            <GameStatForm
              {...this.props}
              selectedTabIndex={this.state.selectedTabIndex}
            />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
}

export default connect(state => ({}), { change })(HomeScreen);
