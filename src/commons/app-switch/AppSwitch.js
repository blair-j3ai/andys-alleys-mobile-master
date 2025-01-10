//import liraries
import React, { Component } from "react";
import { Switch } from "react-native";
import { Colors } from "../../constants";

class AppSwitch extends Component {
  state = { value: false };

  onFastModeChange = event => {
    this.props.input.onChange(event);
  };

  render() {
    const value = this.props.input.value || this.state.value;
    return (
      <Switch
        value={value}
        thumbColor={value ? Colors.onColor : Colors.secondWhite}
        trackColor={{ false: Colors.darkPetrol, true: Colors.seafoamBlue }}
        onValueChange={this.onFastModeChange}
      />
    );
  }
}

export default AppSwitch;
