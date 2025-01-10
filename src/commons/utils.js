import { ScreenOrientation } from "expo";

export const changeScreenOrientation = async (orientation = "portrait") => {
  if (orientation === "portrait") {
    return ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  } else {
    return ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
};

export const getGameTimeCount = remTime => {
  const { second, minute, hour } = getTimeFromSecond(remTime);
  return `${convertToDate(hour)} : ${convertToDate(minute)} : ${convertToDate(
    second
  )} `;
};

function convertToDate(date) {
  return date < 10 ? `0${date}` : date;
}

function getTimeFromSecond(timeInSec) {
  let second = timeInSec % 60;
  let remTime = timeInSec - second;
  let minute = (remTime / 60) % 60;
  remTime = remTime / 60 - minute;
  let hour = remTime / 60;
  return { second, minute, hour };
}
