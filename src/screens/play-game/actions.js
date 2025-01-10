import { cloneDeep } from "lodash";
import { initialPinState } from "./reducer";

/**
 * @param {number} pressedPinIndex
 */
export function onPinPress(pressedPinIndex) {
  return (dispatch, getState) => {
    let pins = JSON.parse(JSON.stringify(getState().pins));
    pins[pressedPinIndex].pressed = !pins[pressedPinIndex].pressed;
    dispatch({ type: "updatePin", payload: pins });
  };
}

export function fixedPressedPins() {
  return (dispatch, getState) => {
    let pinHistory = cloneDeep(getState().pins);
    updatedPins = Object.values(pinHistory).map(item =>
      item.pressed ? { ...item, fixed: true } : item
    );
    dispatch({ type: "updatePin", payload: updatedPins });
    return pinHistory;
  };
}

export function resetPins() {
  return dispatch => {
    dispatch({ type: "resetPin", payload: {} });
    return initialPinState;
  };
}

export function undoPins(pinHistory) {
  return (dispatch, getState) => {
    const pins = Object.values(pinHistory).map(item =>
      item.pressed && !item.fixed ? { ...item, pressed: false } : item
    );
    dispatch({ type: "undoPins", payload: pins });
  };
}
