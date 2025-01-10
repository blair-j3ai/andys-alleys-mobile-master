import { frameLength } from "./initializePlayers";
import { cloneDeep } from "lodash";
/**
 * - switch palyer switchs the player and also update the redux store with updated score to reduce multiple rerendering
 * @param {obj} gameSession
 * @param {dispatcher of reduxForm} change
 * @param {obj currentPlayer} activePlayer
 * @param {obj lastScore for undo feature} lastScore
 * @param {function} navigateToViewScoreScreen
 * @param {boolean to know if switchPlayer has been called from skip button or record button} skipped
 * @param {object to know if the game is in fastmode or normal mode} fastMode
 */
export function switchAndUpdatePlayer(
  gameSession,
  change,
  activePlayer,
  lastScore,
  navigateToViewScoreScreen,
  skipped = false,
  fastMode = { fastMode: false }
) {
  let activePlayerCopy = cloneDeep(activePlayer);
  let gameSessionCopy = cloneDeep(gameSession);
  let newPlayerIndex = getNewPlayerIndex(gameSessionCopy, activePlayerCopy);

  let activeFrameIndex = activePlayerCopy.activeFrameIndex;
  let highestFrameIndex = activePlayerCopy.highestFrameIndex;
  let newGameSession = {};
  /**
   * checking if
   * fastMode && firstFrame of fastMode && the switchPlayer is not called by hitting the skip button
   */
  if (fastMode.fastMode && activeFrameIndex % 2 === 0 && !skipped) {
    newGameSession = gameSessionCopy.map(item => {
      if (item.index === activePlayerCopy.index) {
        activePlayerCopy.activeBallIndex = 0;
        activePlayerCopy.activeFrameIndex = item.activeFrameIndex + 1;
        return activePlayerCopy;
      }
      return item;
    });
  } else {
  /** if
   * not fastMode or not firstframe of fastMode or player is skipped
   */
    let highestFrameIncrement = fastMode.fastMode ? 2 : 1;
    newGameSession = gameSessionCopy.map(item => {
      if (item.index === activePlayerCopy.index) {
        /**
         * checking if the player is skipped
         * if skipped making the activePlayer active status false
         * else
         * checking if the activeFrameIndex doesn't equals highestFrameIndex
         * if true making the activePlayer active status true
         * else active Player active status is false
         * also if the activePlayer is only player i.e. gameSession.length === 1 then activePlayer active status is always true
         */
        activePlayerCopy.isActive = !skipped
          ? activeFrameIndex !== highestFrameIndex ||
            gameSessionCopy.length === 1
          : false;

        activePlayerCopy.activeBallIndex = 0;
        // checking if every frame has been completed
        /**
         * * Problem: While skipping player upto last frame:
         *  the highest frame index + 1 becomes equal to the totalFrameLength 
         *  which caused navigation to navigate to ThankYouScreen.
         *  e.g. if the player is in sixth frame and then skips upto ninth frame
         *  Now if the same player tries to record its score from sixth frame then
         *  when it tries to switch frame highestFrameIndex + 1 >= frameLength becomes true.
         *  which causes the game to completed and navigate to ThankYouScreen.
         *  This is why else condition is needed.  
         */
        if (skipped) {
          activePlayerCopy.completed = highestFrameIndex + 1 >= frameLength;
        } else {
          /**
           * * Reason to do this:
           *  Active Player becomes completed only if it's activeFrameindex equals to highestFrameIndex.
           * Also, it needs to be greater than or equals to total framelength.
           */
          activePlayerCopy.completed =
            highestFrameIndex + 1 >= frameLength &&
            activeFrameIndex === highestFrameIndex;
        }
        // only increasing the frameIndex if the player is not skipped
        activePlayerCopy.activeFrameIndex = !skipped
          ? item.activeFrameIndex + 1
          : item.activeFrameIndex;

        // should come from skip or activeFrameIndex should be equal to highestFrameIndex
        activePlayerCopy.highestFrameIndex =
          skipped || activeFrameIndex === highestFrameIndex
            ? item.highestFrameIndex + highestFrameIncrement
            : item.highestFrameIndex;
        return activePlayerCopy;
      }

      if (item.index === newPlayerIndex) {
        /**
         * checking if the acitvePlayer is skipped
         * if (true)
         * switching the player
         * else checking if activePlayer's activeFrameIndex === highestFrameIndex
         * if it equal switching the player otherwise activePlayer will play another frame too.
         */
        item.isActive = !skipped
          ? activeFrameIndex === highestFrameIndex
          : true;
        return item;
      }

      return item;
    });
  }

  /** storing game session */
  lastScoreCopy = cloneDeep(lastScore);
  if (lastScore.length === 3) {
    lastScoreCopy.shift();
  }
  lastScoreCopy.push(cloneDeep(gameSession));

  change("lastScore", lastScoreCopy);
  change("gameSession", newGameSession);

  // terminating game if last player has completed its turn
  if (newGameSession[newGameSession.length - 1].completed) {
    // also deepClone the form here and store it in reduxStore for further usage.
    navigateToViewScoreScreen();
  }
}

function getNewPlayerIndex(gameSession, activeplayer) {
  return gameSession.length === activeplayer.index + 1
    ? 0
    : activeplayer.index + 1;
}
