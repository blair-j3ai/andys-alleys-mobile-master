import React from "react";
import { View, Text, Image } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

import { ScreenWrapper, AppButton } from "../../commons";
import { Images, GStyles } from "../../constants";
import Styles from "./Styles";
import { changeScreenOrientation, getGameTimeCount } from "../../commons/utils";
import { generateMailTemplate } from "./generateMailTemplate";

export default class ThankYouScreen extends React.Component {
  componentDidMount() {
    changeScreenOrientation("landscape");
  }

  onPressBackToHome = () => {
    this.props.navigation.navigate("HomeScreen");
  };

  onPressEmailScore = async () => {
    const { navigation } = this.props;
    let gameHistory = navigation.state.params.gameHistoryCopy || [];
    const html = generateMailTemplate(gameHistory);

    const mailTemplateFile = await Print.printToFileAsync({
      html: html
    });

    const mail = await MailComposer.composeAsync({
      // recipients: ["bjupreti@gmail.com"],
      // ccRecipients: ["bijay@jyaasa.com"],
      subject: "Andy's Alleys",
      body: "Please find attached to this email a copy of Game Scores.",
      attachments: [mailTemplateFile.uri]
    });
  };

  render() {
    const {
      navigation: { getParam }
    } = this.props;

    const totalTimePlayed = getParam("totalTimePlayed", undefined);

    return (
      <ScreenWrapper wrapperStyle={Styles.container}>
        <View style={Styles.topContainer}>
          <View style={Styles.logoWrapper}>
            <Image
              source={Images.tweedColorLogo}
              style={Styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={[GStyles.petrol30Bold, Styles.completedText]}>
            COMPLETED
          </Text>

          <Text style={[GStyles.darkGrey21Regular, Styles.thankYouText]}>
            Thank you for having a wonderful game with Andy's Alleys
          </Text>

          {totalTimePlayed ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={GStyles.petrol24semiBold}>{`Time spent - `}</Text>

              <Text style={GStyles.petrol24regular}>
                {getGameTimeCount(totalTimePlayed)}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={Styles.bottomContainer}>
          <View style={Styles.arrow} />

          <AppButton
            title="BACK TO HOME"
            btnStyle={{ width: 200, marginRight: 100 }}
            onPress={this.onPressBackToHome}
          />

          <AppButton
            title="Email Scores"
            outline
            onPress={this.onPressEmailScore}
            btnStyle={{ width: 200 }}
          />
        </View>
      </ScreenWrapper>
    );
  }
}
