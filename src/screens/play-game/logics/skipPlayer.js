import { cloneDeep } from "lodash";
import { switchAndUpdatePlayer } from "./switchPlayer";

export function onSkipPress(
  change,
  gameSession,
  activePlayer,
  resetPins,
  lastScore,
  navigateToViewScoreScreen,
  fastMode
) {
  let activePlayerCopy = cloneDeep(activePlayer);

  /** storing pin history */
  const pinHistory = resetPins();
  const gameSessionCopy = cloneDeep(gameSession);
  /** gameSessionWithPinHistory */
  const gameSessionWithPH = gameSessionCopy.map(item => {
    if (item.id === activePlayer.id) {
      const { activeBallIndex } = item;
      item.pinHistory = {};
      item.pinHistory[activeBallIndex] = pinHistory;
      return item;
    }
    return item;
  });

  switchAndUpdatePlayer(
    gameSessionWithPH,
    change,
    activePlayerCopy,
    lastScore,
    navigateToViewScoreScreen,
    true,
    fastMode
  );
}
