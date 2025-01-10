import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { find, cloneDeep } from "lodash";

import { Colors, GStyles, Layouts } from "../../../constants";
import { FontAwesome } from "@expo/vector-icons";

const Styles = StyleSheet.create({
  gameScoreWrapper: {
    backgroundColor: Colors.darkGrey,
    borderRadius: 5,
    paddingBottom: 10
  },
  title: {
    ...GStyles.lightGrey25Bold,
    textAlign: "center",
    paddingVertical: 5
  },
  separator: {
    borderWidth: 1,
    borderColor: Colors.lightGrey
  },
  playerScoreBox: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  playerScore: {
    paddingTop: 10,
    paddingHorizontal: Layouts.isSmallDevice ? 15 : 30,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "33%",
    flexDirection: "row"
  },
  scoreText: {
    ...GStyles.darkGrey18Regular,
    backgroundColor: Colors.lightGrey,
    // height: Layouts.isSmallDevice ? 35 : 43,
    padding: 10,
    alignSelf: "center",
    // lineHeight: Layouts.isSmallDevice ? 35 : 43,
    marginRight: 20
  },
  playerName: {
    ...GStyles.lightGrey20Regular
  },
  undoBtnWrapper: {
    borderRadius: 4,
    backgroundColor: Colors.white,
    padding: 5,
    position: "absolute",
    bottom: 5,
    right: 10
  }
});

function onUndoPress(lastScore, change, undoPins) {
  lastScoreDeepClone = cloneDeep(lastScore);
  const prevGameSession = lastScoreDeepClone.pop();
  activePlayer = find(prevGameSession, { isActive: true });
  const { activeBallIndex } = activePlayer;
  const pinHistory = activePlayer.pinHistory[activeBallIndex];
  undoPins(pinHistory);

  change("gameSession", prevGameSession);
  change("lastScore", lastScoreDeepClone);
}

export default function GameScore({
  gameSession,
  lastScore,
  change,
  undoPins
}) {
  this.renderScores = item => (
    <View style={Styles.playerScore}>
      <Text style={Styles.scoreText}>{item.totalScore}</Text>

      <Text style={Styles.playerName}>{item.name}</Text>
    </View>
  );

  _keyExtractor = (item, index) => index;
  const disableUndo =
    typeof lastScore === "object" && Object.keys(lastScore).length > 0;
  return (
    <View style={Styles.gameScoreWrapper}>
      <View>
        <View></View>

        <Text style={[GStyles.lightGrey18Regular, Styles.title]}>
          GAME SCORE
        </Text>

        <TouchableOpacity
          style={Styles.undoBtnWrapper}
          disabled={disableUndo ? false : true}
          onPress={() => onUndoPress(lastScore, change, undoPins)}
        >
          <FontAwesome
            name="undo"
            size={24}
            color={disableUndo ? Colors.petrol : Colors.secondWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={Styles.separator} />

      {/* <View style={Styles.playerScoreBox}> */}
      <FlatList
        numColumns={3}
        keyExtractor={this._keyExtractor}
        data={gameSession}
        renderItem={({ item }) => this.renderScores(item)}
      />
      {/* </View> */}
    </View>
  );
}
