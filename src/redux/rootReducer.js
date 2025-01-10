import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import { Pins } from "../screens/play-game";

export default combineReducers({
  form,
  pins: Pins
});
