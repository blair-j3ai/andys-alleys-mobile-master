/**
 * TODO: change this component to stateless component
 */
import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";
import { Colors, GStyles } from "../../constants";
import PropTypes from "prop-types";

const Styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 3,
    height: 40,
    width: 100,
    color: Colors.white,
    fontSize: 20,
    fontFamily: "opensans-regular",
    backgroundColor: Colors.darkPetrol,
    textAlign: "center"
  },
  outlined: {
    borderBottomColor: Colors.seafoamBlue,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: "100%",
    color: Colors.darkGrey,
    textAlign: "left",
    padding: 5,
    fontSize: 20,
    backgroundColor: "transparent"
  }
});

export default class AppTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  static defaultProps = {
    outlined: false,
    textInputStyle: {},
    meta: {},
    input: {}
  };

  static propTypes = {
    outlined: PropTypes.bool,
    textInputStyle: PropTypes.shape({}),
    meta: PropTypes.shape({}),
    input: PropTypes.shape({})
  };

  onChange = event => {
    /**
     * TODO:
     * * This textinput is not completely reusable because of poor else condition.
     */
    const { text } = event.nativeEvent;
    const { index } = this.props;
    if (this.props.input && this.props.input.onChange) {
      this.props.input.onChange(text);
    } else {
      this.props.onChange(index, text);
      this.setState({ text });
    }
  };

  render() {
    const { input, outlined, textInputStyle, meta, playerName } = this.props;
    return (
      <View style={outlined ? { flex: 1 } : {}}>
        <TextInput
          {...this.props}
          value={(input && input.value) || playerName}
          onChange={this.onChange}
          {...input}
          style={[
            outlined ? Styles.outlined : Styles.textInputStyle,
            textInputStyle
          ]}
        />

        <Text style={GStyles.errorText}>
          {meta && meta.touched && meta.error ? meta.error : ""}
        </Text>
      </View>
    );
  }
}
