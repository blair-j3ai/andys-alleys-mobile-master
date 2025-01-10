import React from "react";
import { View, Text } from "react-native";
import { GStyles } from "../../constants";
import Styles from "./Styles";
import PropTypes from "prop-types";

function Frame({
  frameNumber,
  frameScore,
  isFirstActive,
  isSecondActive,
  isThirdActive,
  firstBallScore,
  secondBallScore,
  thirdBallScore
}) {
  return (
    <View style={Styles.frameWrapper}>
      <View style={[GStyles.spaceBetn, { paddingVertical: 5 }]}>
        <Text
          style={[
            Styles.input,
            Styles.ballNumber,
            isFirstActive ? Styles.activeBallStyle : {}
          ]}
        >
          {firstBallScore === 15 ? "x" : firstBallScore}
        </Text>

        <Text
          style={[
            Styles.input,
            Styles.ballNumber,
            { marginHorizontal: 5 },
            isSecondActive ? Styles.activeBallStyle : {}
          ]}
        >
          {firstBallScore === 15 && frameNumber !== 10
            ? ""
            : firstBallScore + secondBallScore === 15 && secondBallScore !== 0
            ? "/"
            : secondBallScore}
        </Text>

        <Text
          style={[
            Styles.input,
            Styles.ballNumber,
            isThirdActive ? Styles.activeBallStyle : {}
          ]}
        >
          {thirdBallScore !== "" &&
          (firstBallScore === 15 || firstBallScore + secondBallScore === 15)
            ? firstBallScore + secondBallScore + thirdBallScore
            : thirdBallScore}
        </Text>
      </View>

      <Text style={[Styles.input, Styles.frameScore]}>{frameScore} </Text>

      <Text style={[Styles.input, Styles.frameNumber]}>{frameNumber}</Text>
    </View>
  );
}

Frame.propTypes = {
  frameNumber: PropTypes.number,
  frameScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isFirstActive: PropTypes.bool,
  isSecondActive: PropTypes.bool,
  isThirdActive: PropTypes.bool,
  firstBallScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondBallScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thirdBallScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Frame.defaultProps = {
  frameNumber: 1,
  frameScore: "",
  isFirstActive: false,
  isSecondActive: false,
  isThirdActive: false,
  firstBallScore: "",
  secondBallScore: "",
  thirdBallScore: ""
};

export default function Frames({ title, activePlayer }) {
  return (
    <View style={Styles.scoreBoardWrapper}>
      <View style={Styles.scoreBoardHeader}>
        <Text style={GStyles.lightGrey18Regular}>{title}</Text>
        <Text style={GStyles.lightGrey18Regular}>
          Total Score: {activePlayer ? activePlayer.totalScore : 0}
        </Text>
      </View>

      <View style={[GStyles.spaceBetn, Styles.framesWrapper]}>
        {activePlayer
          ? activePlayer.scoreHistory.map((item, index) => (
              <Frame
                key={item.id}
                frameNumber={index + 1}
                frameScore={item.frameScore}
                isFirstActive={
                  activePlayer.activeBallIndex === 0 &&
                  activePlayer.activeFrameIndex === index
                }
                isSecondActive={
                  activePlayer.activeBallIndex === 1 &&
                  activePlayer.activeFrameIndex === index
                }
                isThirdActive={
                  activePlayer.activeBallIndex === 2 &&
                  activePlayer.activeFrameIndex === index
                }
                firstBallScore={item[0].score}
                secondBallScore={item[1].score}
                thirdBallScore={item[2].score}
              />
            ))
          : null}
      </View>
    </View>
  );
}

Frames.propTypes = {
  title: PropTypes.string
};

Frames.defaultProps = {
  title: "Title"
};
