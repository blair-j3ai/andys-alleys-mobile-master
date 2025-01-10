export function getCurrentScore(pins) {
  return Object.values(pins)
    .filter(item => item.pressed && !item.fixed)
    .reduce((a, b) => ({ score: a.score + b.score }), { score: 0 });
}

/**
 * * This method is called once all the balls is filled with score
 * i.e. - when all the third ball is scored
 * - when previous frame is update because of spare or strike
 * and when double previous frame is updated because of double strike
 * @param {obj} activePlayer
 * @param {number} frameNumber of which it gives total Score
 */
export function getCumulativeFrameScore(activePlayer, frameNumber) {
  return (
    activePlayer.totalScore +
    activePlayer.scoreHistory[frameNumber][0].score +
    activePlayer.scoreHistory[frameNumber][1].score +
    activePlayer.scoreHistory[frameNumber][2].score
  );
}
