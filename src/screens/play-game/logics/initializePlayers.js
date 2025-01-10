const uuidv4 = require("uuid/v4");
export const frameLength = 10;

export const initializePlayers = (
  players,
  change,
  noOfPlayedGames,
  fastMode
) => {
  let initalPlayerValues = players.map((item, index) => {
    return {
      id: uuidv4(),
      index,
      name: item,
      isActive: index === 0,
      activeFrameIndex: 0,
      highestFrameIndex: fastMode.fastMode ? 1 : 0,
      activeBallIndex: 0,
      totalScore: 0,
      // initializing empty frames
      scoreHistory: Array.from(Array(frameLength).keys()).map(
        (item, index) => ({
          id: uuidv4(),
          index,
          0: {},
          1: {},
          2: {}
        })
      )
    };
  });
  change("noOfPlayedGames", noOfPlayedGames + 1);
  change("gameSession", initalPlayerValues);
  change("fastMode", { fastMode: fastMode.fastMode });
  change("lastScore", []);
};
