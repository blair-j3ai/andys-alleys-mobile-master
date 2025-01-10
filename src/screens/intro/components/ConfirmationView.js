import React, { useState } from "react";
import { View, Text, Alert, Keyboard, TouchableOpacity } from "react-native";
import * as MailComposer from "expo-mail-composer";
import {
  CodeField,
  Cursor,
  useClearByFocusCell
} from "react-native-confirmation-code-field";

import { GStyles } from "../../../constants";
import { AppButton } from "../../../commons";

import styles from "../styles";

const CELL_COUNT = 4;

const ConfirmationView = ({ navigation: { navigate } }) => {
  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const handleOnPress = () => {
    Keyboard.dismiss();

    if (value.length === 0) {
      Alert.alert("Please enter the code.", "Four pin code is required.");
    } else if (value.length !== 4) {
      Alert.alert(
        "Please enter all the code.",
        "Some of the code are missing."
      );
    } else if (value === "3279") {
      navigate("HomeScreen");
    } else {
      Alert.alert("Code does not match.", "Please try again.");
    }
  };

  const openMail = async () => {
    await MailComposer.composeAsync({
      recipients: ["support@hyfertech.com"],
      subject: "Requesting for code"
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", marginVertical: 20 }}>
        <Text style={styles.title}>Authenticator</Text>
      </View>

      <View style={styles.root}>
        <CodeField
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          onSubmitEditing={() => Keyboard.dismiss()}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View style={styles.buttonView}>
          <AppButton
            btnStyle={{ width: "100%", marginTop: 28 }}
            title="Start"
            onPress={handleOnPress}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.7}
        onPress={openMail}
      >
        <Text style={[GStyles.lightGrey20Regular, { marginTop: 48 }]}>
          Need a code? Contact: support@hyfertech.com
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationView;
