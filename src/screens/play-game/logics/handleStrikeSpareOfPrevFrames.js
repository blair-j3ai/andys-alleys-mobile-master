/**
 * TODO:
 * * Write tests for following cases:
 * - if there was a spare in previous frame
 * - if there was a strike in previous frame and second ball has not been updated
 * - if there was a strike in previous frame and second ball has been updated
 * - if there was a double strike in prevPrevFrame
 */
import { cloneDeep } from "lodash";

import { getCumulativeFrameScore } from "./getScores";

export function handleStrikeSpareOfPrevFrames(currentScore, activePlayer) {
  let activePlayerCopy = cloneDeep(activePlayer);
  let activeFrameIndex = activePlayerCopy.activeFrameIndex;
  let prevFrame =
    activePlayerCopy.scoreHistory[activeFrameIndex - 1] || undefined;
  let prevPrevFrame =
    activePlayerCopy.scoreHistory[activeFrameIndex - 2] || undefined;

  // check if there was Strike in Prev Frame
  if (prevFrame && prevFrame.strike) {
    // check if second ball has been updated and then update third one if second has been updated
    if (prevFrame.secondUpdated) {
      prevFrame[2].score = currentScore.score;
      prevFrame.strike = false;
      // updating frameScore
      let frameScore = getCumulativeFrameScore(
        activePlayerCopy,
        activeFrameIndex - 1
      );
      prevFrame.frameScore = frameScore;
      // updating totalScore
      activePlayerCopy.totalScore = frameScore;
    } else {
      // update second ball and change the status of second ball to updated
      prevFrame[1].score = currentScore.score;
      prevFrame.secondUpdated = true;

      // check if double strike
      if (currentScore.score === 15 && prevFrame) {
        prevFrame.doubleStrike = true;
      }
    }
    // handle double Strike
    if (prevPrevFrame && prevPrevFrame.doubleStrike) {
      prevPrevFrame[2].score = currentScore.score;
      // updating frameScore
      let frameScore = getCumulativeFrameScore(
        activePlayerCopy,
        activeFrameIndex - 2
      );
      prevPrevFrame.frameScore = frameScore;
      prevPrevFrame.doubleStrike = false;
      // updating totalScore
      activePlayerCopy.totalScore = frameScore;
    }
  }

  // check if there was spare in Prev Frame
  if (prevFrame && prevFrame.spare) {
    if (!prevFrame.updateSpareScore) {
      prevFrame[2].score = currentScore.score;
      prevFrame.updateSpareScore = true;
      // updating frameScore
      let frameScore = getCumulativeFrameScore(
        activePlayerCopy,
        activeFrameIndex - 1
      );
      prevFrame.frameScore = frameScore;
      // updating totalScore
      activePlayerCopy.totalScore = frameScore;
    }
  }
  return activePlayerCopy;
} // end: handleStrikeSpareOfPrevFrames()
