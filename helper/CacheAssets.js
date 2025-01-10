import * as Font from "expo-font";
import { Asset } from "expo-asset";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });
}

const imageAssets = cacheImages([
  require("../assets/images/andysAlleys.png"),
  require("../assets/images/lightPin.png"),
  require("../assets/images/pin.png"),
  require("../assets/images/pinBackground.png")
]);

const fontAssets = Font.loadAsync({
  "opensans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  "opensans-light": require("../assets/fonts/OpenSans-Light.ttf"),
  "opensans-medium": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  "opensans-regular": require("../assets/fonts/OpenSans-Regular.ttf")
});

export { imageAssets, fontAssets };
