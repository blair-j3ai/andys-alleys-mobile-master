import { switchAndUpdatePlayer } from "./switchPlayer";
import { handleStrikeSpareOfPrevFrames } from "./handleStrikeSpareOfPrevFrames";
import { getCurrentScore, getCumulativeFrameScore } from "./getScores";
import { frameLength } from "./initializePlayers";
import { cloneDeep } from "lodash";

let pinHistory = {};

/**
 * 
 * @param {form change dispatcher} change 
 * @param {gameSession object} gameSession 
 * @param {selectedpins object} pins 
 * @param {currentplayer object} activePlayer 
 * @param {dispatcher} fixedPressedPins 
 * @param {dispatcher} resetPins 
 * @param {object} lastScore for undo 
 * @param {function} navigateToViewScoreScreen 
 * @param {object} to know if the game is in fastMode 
 */
export const onRecordPress = (
  change,
  gameSession,
  pins,
  activePlayer,
  fixedPressedPins,
  resetPins,
  lastScore,
  navigateToViewScoreScreen,
  fastMode
) => {
  // calculating the score obtained by current ball
  let currentScore = getCurrentScore(pins);
  let skipped = false;

  // handle strike and spare of previous frames
  let currentPlayer = handleStrikeSpareOfPrevFrames(currentScore, activePlayer);

  let activeFrameIndex = currentPlayer.activeFrameIndex;
  let activeBallIndex = currentPlayer.activeBallIndex;

  // disabling the pressed pins for current frame
  pinHistory = fixedPressedPins();

  // storing pin History
  /** gameSessionWithPinHistory */
  const gameSessionWithPH = cloneDeep(gameSession).map(item => {
    if (item.id === activePlayer.id) {
      item.pinHistory = {};
      item.pinHistory[activeBallIndex] = pinHistory;
      return item;
    }
    return item;
  });

  // storing the record
  currentPlayer.scoreHistory[activeFrameIndex][activeBallIndex].score =
    currentScore.score;

  // increasing active Ball Number
  currentPlayer.activeBallIndex = activeBallIndex < 2 ? activeBallIndex + 1 : 0;

  // check if it's strike or doubleStrike which only happens in lastframe
    if (
      (activeBallIndex === 0 && currentScore.score === 15) ||
      (activeBallIndex === 1 &&
        currentScore.score +
          currentPlayer.scoreHistory[activeFrameIndex][0].score ===
          30)
    ) {
    currentPlayer.scoreHistory[activeFrameIndex].strike = true;
    resetPins();
    // checked if this is the last frame and not switching the player even if it's strike
    if (activeFrameIndex + 1 !== frameLength) {
      switchAndUpdatePlayer(
        gameSessionWithPH,
        change,
        currentPlayer,
        lastScore,
        navigateToViewScoreScreen,
        skipped,
        fastMode
      );
    } else {
      updateScoreInReduxStore(
        currentPlayer,
        change,
        gameSessionWithPH,
        lastScore
      );
    }
  }
  // check if it's spare
  else if (
    activeBallIndex === 1 &&
    currentScore.score +
      currentPlayer.scoreHistory[activeFrameIndex][0].score ===
      15
  ) {
    currentPlayer.scoreHistory[activeFrameIndex].spare = true;
    resetPins();
    // checked if this is the last frame and not switching the player even if it's spare
    if (activeFrameIndex + 1 !== frameLength) {
      switchAndUpdatePlayer(
        gameSessionWithPH,
        change,
        currentPlayer,
        lastScore,
        navigateToViewScoreScreen,
        skipped,
        fastMode
      );
    } else {
      updateScoreInReduxStore(
        currentPlayer,
        change,
        gameSessionWithPH,
        lastScore
      );
    }
  }
  // check if it's last ball of frame
  else if (activeBallIndex === 2) {
    let frameScore = getCumulativeFrameScore(currentPlayer, activeFrameIndex);
    currentPlayer.scoreHistory[activeFrameIndex].frameScore = frameScore;
    // updating totalScore
    currentPlayer.totalScore = frameScore;
    resetPins();
    switchAndUpdatePlayer(
      gameSessionWithPH,
      change,
      currentPlayer,
      lastScore,
      navigateToViewScoreScreen,
      skipped,
      fastMode
    );
  }
  // when first and second player and also not strike and spare
  else {
    updateScoreInReduxStore(
      currentPlayer,
      change,
      gameSessionWithPH,
      lastScore
    );
  }
}; // end: recordScoreInScoreHistory()

// update the redux score with new score
function updateScoreInReduxStore(
  activePlayerWithNewScore,
  change,
  gameSession,
  lastScore
) {
  const newGameSession = gameSession.map(item =>
    item.id === activePlayerWithNewScore.id ? activePlayerWithNewScore : item
  );
  /** Maintaining last score history upto three times*/
  const lastScoreCopy = cloneDeep(lastScore);
  if (lastScore.length === 3) {
    lastScoreCopy.shift();
  }
  lastScoreCopy.push(gameSession);
  change("lastScore", lastScoreCopy);
  change("gameSession", newGameSession);
}
